import {
  Animated,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React, { ReactNode, useCallback } from "react";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

type BouncyButtonProps = Omit<
  TouchableOpacityProps,
  "onPressIn" | "onPressOut"
> & {
  children: ReactNode;
};

const BouncyButton: React.FC<BouncyButtonProps> = ({
  children,
  style,
  ...rest
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      bounciness: 10,
    }).start();
  }, []);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 10,
    }).start();
  }, []);

  const animatedStyle = {
    transform: [{ scale: scaleAnim }],
  };

  return (
    <AnimatedTouchable
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style, animatedStyle]}
      {...rest}
    >
      {children}
    </AnimatedTouchable>
  );
};

export default BouncyButton;
