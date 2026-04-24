import type { BackgroundStyle, ProcessedImageResult } from "@/types/image";

type ProcessImageInput = {
  sourceDataUrl: string;
  fileName: string;
  backgroundStyle: BackgroundStyle;
};

export interface ImageProcessor {
  processImage(input: ProcessImageInput): Promise<ProcessedImageResult>;
}

const backgroundPalette: Record<BackgroundStyle, string> = {
  white: "#ffffff",
  lightGray: "#f2f3f5"
};

class MockBackgroundImageProcessor implements ImageProcessor {
  async processImage(input: ProcessImageInput): Promise<ProcessedImageResult> {
    const image = await loadImage(input.sourceDataUrl);
    const workingCanvas = document.createElement("canvas");
    workingCanvas.width = image.naturalWidth;
    workingCanvas.height = image.naturalHeight;

    const workingContext = workingCanvas.getContext("2d");
    if (!workingContext) {
      throw new Error("画像処理の準備に失敗しました。");
    }

    workingContext.drawImage(image, 0, 0);
    const imageData = workingContext.getImageData(0, 0, workingCanvas.width, workingCanvas.height);
    const backgroundColor = hexToRgb(backgroundPalette[input.backgroundStyle]);
    const mask = buildBackgroundMask(imageData);
    replaceBackground(imageData.data, mask, backgroundColor, workingCanvas.width, workingCanvas.height);
    workingContext.putImageData(imageData, 0, 0);

    const outputCanvas = document.createElement("canvas");
    const frameSize = Math.max(workingCanvas.width, workingCanvas.height);
    outputCanvas.width = frameSize;
    outputCanvas.height = frameSize;

    const outputContext = outputCanvas.getContext("2d");
    if (!outputContext) {
      throw new Error("処理結果の描画に失敗しました。");
    }

    outputContext.fillStyle = backgroundPalette[input.backgroundStyle];
    outputContext.fillRect(0, 0, frameSize, frameSize);

    const targetSize = Math.round(frameSize * 0.86);
    const scale = Math.min(targetSize / workingCanvas.width, targetSize / workingCanvas.height);
    const renderedWidth = Math.round(workingCanvas.width * scale);
    const renderedHeight = Math.round(workingCanvas.height * scale);
    const offsetX = Math.round((frameSize - renderedWidth) / 2);
    const offsetY = Math.round((frameSize - renderedHeight) / 2);

    outputContext.shadowColor = "rgba(15, 23, 42, 0.10)";
    outputContext.shadowBlur = Math.round(frameSize * 0.025);
    outputContext.shadowOffsetY = Math.round(frameSize * 0.012);
    outputContext.drawImage(workingCanvas, offsetX, offsetY, renderedWidth, renderedHeight);

    const dataUrl = outputCanvas.toDataURL("image/png");

    return {
      dataUrl,
      fileName: buildOutputName(input.fileName),
      mimeType: "image/png",
      width: outputCanvas.width,
      height: outputCanvas.height,
      backgroundStyle: input.backgroundStyle
    };
  }
}

export function getImageProcessor(): ImageProcessor {
  const provider = process.env.NEXT_PUBLIC_IMAGE_PROCESSOR_PROVIDER;

  switch (provider) {
    case undefined:
    case "":
    case "mock":
      return new MockBackgroundImageProcessor();
    default:
      return new MockBackgroundImageProcessor();
  }
}

export async function processImage(
  sourceDataUrl: string,
  backgroundStyle: BackgroundStyle,
  fileName: string
) {
  return getImageProcessor().processImage({ sourceDataUrl, backgroundStyle, fileName });
}

function buildOutputName(fileName: string) {
  const normalized = fileName.replace(/\.[a-zA-Z0-9]+$/, "");
  return `${normalized}-background.png`;
}

function loadImage(dataUrl: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("画像の読み込みに失敗しました。"));
    image.src = dataUrl;
  });
}

function replaceBackground(
  pixels: Uint8ClampedArray,
  mask: Uint8Array,
  backgroundColor: { r: number; g: number; b: number },
  width: number,
  height: number
) {
  for (let index = 0; index < mask.length; index += 1) {
    if (mask[index] === 0) {
      continue;
    }

    const pixelIndex = index * 4;
    const edgeStrength = hasForegroundNeighbor(mask, index, width, height) ? 0.45 : 0;
    pixels[pixelIndex] = blendChannel(pixels[pixelIndex], backgroundColor.r, 1 - edgeStrength);
    pixels[pixelIndex + 1] = blendChannel(pixels[pixelIndex + 1], backgroundColor.g, 1 - edgeStrength);
    pixels[pixelIndex + 2] = blendChannel(pixels[pixelIndex + 2], backgroundColor.b, 1 - edgeStrength);
    pixels[pixelIndex + 3] = 255;
  }
}

function hasForegroundNeighbor(mask: Uint8Array, index: number, width: number, height: number) {
  const x = index % width;
  const y = Math.floor(index / width);
  const neighbors = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1]
  ];

  return neighbors.some(([neighborX, neighborY]) => {
    if (neighborX < 0 || neighborY < 0 || neighborX >= width || neighborY >= height) {
      return false;
    }

    return mask[neighborY * width + neighborX] === 0;
  });
}

function blendChannel(original: number, target: number, strength: number) {
  return Math.round(original * (1 - strength) + target * strength);
}

function buildBackgroundMask(imageData: ImageData) {
  const { width, height, data } = imageData;
  const mask = new Uint8Array(width * height);
  const queue: number[] = [];
  const sampledBackground = sampleCornerAverage(data, width, height);
  const threshold = 48;

  for (let x = 0; x < width; x += 1) {
    queueIfBackground(queue, mask, data, x, 0, width, height, sampledBackground, threshold);
    queueIfBackground(queue, mask, data, x, height - 1, width, height, sampledBackground, threshold);
  }

  for (let y = 0; y < height; y += 1) {
    queueIfBackground(queue, mask, data, 0, y, width, height, sampledBackground, threshold);
    queueIfBackground(queue, mask, data, width - 1, y, width, height, sampledBackground, threshold);
  }

  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor];
    const x = current % width;
    const y = Math.floor(current / width);
    const neighbors = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1]
    ];

    neighbors.forEach(([neighborX, neighborY]) => {
      queueIfBackground(queue, mask, data, neighborX, neighborY, width, height, sampledBackground, threshold);
    });
  }

  return mask;
}

function queueIfBackground(
  queue: number[],
  mask: Uint8Array,
  data: Uint8ClampedArray,
  x: number,
  y: number,
  width: number,
  height: number,
  sampledBackground: { r: number; g: number; b: number },
  threshold: number
) {
  if (x < 0 || y < 0 || x >= width || y >= height) {
    return;
  }

  const index = y * width + x;
  if (mask[index] === 1) {
    return;
  }

  const pixelIndex = index * 4;
  const pixel = {
    r: data[pixelIndex],
    g: data[pixelIndex + 1],
    b: data[pixelIndex + 2]
  };

  const distance = colorDistance(pixel, sampledBackground);
  const brightness = pixel.r + pixel.g + pixel.b;
  if (distance > threshold || brightness < 90) {
    return;
  }

  mask[index] = 1;
  queue.push(index);
}

function sampleCornerAverage(data: Uint8ClampedArray, width: number, height: number) {
  const sampleSize = Math.max(6, Math.floor(Math.min(width, height) * 0.04));
  const points: Array<[number, number]> = [
    [0, 0],
    [width - sampleSize, 0],
    [0, height - sampleSize],
    [width - sampleSize, height - sampleSize]
  ];

  let red = 0;
  let green = 0;
  let blue = 0;
  let count = 0;

  points.forEach(([startX, startY]) => {
    for (let y = startY; y < startY + sampleSize; y += 1) {
      for (let x = startX; x < startX + sampleSize; x += 1) {
        const pixelIndex = (y * width + x) * 4;
        red += data[pixelIndex];
        green += data[pixelIndex + 1];
        blue += data[pixelIndex + 2];
        count += 1;
      }
    }
  });

  return {
    r: Math.round(red / count),
    g: Math.round(green / count),
    b: Math.round(blue / count)
  };
}

function colorDistance(
  source: { r: number; g: number; b: number },
  target: { r: number; g: number; b: number }
) {
  return Math.sqrt(
    (source.r - target.r) ** 2 + (source.g - target.g) ** 2 + (source.b - target.b) ** 2
  );
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");

  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16)
  };
}
