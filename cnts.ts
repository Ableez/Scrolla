export type Theme = "light" | "dark";

export interface BaseContent {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface TextContent extends BaseContent {
  _type: "text";
  content: string;
  style: TextStyle;
}

export interface ImageContent extends BaseContent {
  _type: "image";
  url: string;
  alt?: string;
  format: "png" | "gif";
  style: ImageStyle;
}

export type Content = TextContent | ImageContent;

export interface TextStyle {
  variant: "body" | "title" | "caption";
  size: "small" | "medium" | "large";
  isBold?: boolean;
}

export interface ImageStyle {
  size: "small" | "medium" | "large";
  rounded?: boolean;
}

export const defaultStyles = {
  text: {
    body: {
      variant: "body",
      size: "medium",
      isBold: false,
    } as TextStyle,
    title: {
      variant: "title",
      size: "large",
      isBold: true,
    } as TextStyle,
    caption: {
      variant: "caption",
      size: "small",
      isBold: false,
    } as TextStyle,
  },
  image: {
    small: {
      size: "small",
      rounded: true,
    } as ImageStyle,
    medium: {
      size: "medium",
      rounded: true,
    } as ImageStyle,
    large: {
      size: "large",
      rounded: false,
    } as ImageStyle,
  },
} as const;

export const sizeMap = {
  text: {
    small: 14,
    medium: 16,
    large: 24,
  },
  image: {
    small: 150,
    medium: 300,
    large: 600,
  },
} as const;
