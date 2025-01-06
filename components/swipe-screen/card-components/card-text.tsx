import { TextType } from "@/_mock_/swipe-data";
import { baseStyles } from "../base-styles";
import Text from "@/components/text";

// Text component with variants
export const ContentText = ({
  variant,
  content,
  bottomSpace = 16,
  topSpace,
}: {
  variant: TextType;
  content: string;
  bottomSpace?: number;
  topSpace?: number;
}) => {
  const styles = {
    h2: [
      baseStyles.text,
      baseStyles.h2,
      { marginBottom: bottomSpace, marginTop: topSpace },
    ],
    h4: [
      baseStyles.text,
      baseStyles.h4,
      { marginBottom: bottomSpace, marginTop: topSpace },
    ],
    body: [
      baseStyles.text,
      baseStyles.body,
      { marginBottom: bottomSpace, marginTop: topSpace },
    ],
    caption: [
      baseStyles.text,
      baseStyles.caption,
      { marginBottom: bottomSpace },
    ],
  }[variant];

  const weight =
    variant === "h4" ? "semiBold" : variant === "h2" ? "bold" : "regular";

  return (
    <Text weight={weight} style={styles}>
      {content}
    </Text>
  );
};
