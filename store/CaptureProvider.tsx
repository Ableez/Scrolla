import { saveToLibraryAsync } from "expo-media-library";
import React, {
  ComponentProps,
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";
import { Alert, View } from "react-native";
import { captureRef } from "react-native-view-shot";

const CaptureContext = createContext<{
  setImageRef: (ref: React.RefObject<any>) => void;
  capture: () => Promise<string | null>;
}>({
  capture: () => Promise.resolve(null),
  setImageRef: () => {},
});

export const CaptureProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [imageRef, setImageRef] = useState<React.RefObject<any> | null>(null);

  const capture = async () => {
    if (imageRef?.current) {
      try {
        const uri = await captureRef(imageRef.current, {
          format: "png",
          quality: 1,
        });

        await saveToLibraryAsync(uri);

        if (uri) {
          Alert.alert("📸 Picture taken successfully!");
        }
      } catch (error) {
        return null;
      }
    } else {
      Alert.alert("There is no ref to capture");
    }

    return null;
  };

  const contextValue = React.useMemo(
    () => ({
      capture,
      setImageRef,
    }),
    [capture, setImageRef]
  );

  return (
    <CaptureContext.Provider value={contextValue}>
      {children}
    </CaptureContext.Provider>
  );
};

export const CaptureWrapper: React.FC<
  PropsWithChildren & ComponentProps<typeof View>
> = ({ children, ...props }) => {
  const imageRef = useRef(null);
  const { setImageRef } = useContext(CaptureContext);

  React.useEffect(() => {
    setImageRef(imageRef);
  }, [setImageRef]);

  return (
    <View ref={imageRef} {...props}>
      {children}
    </View>
  );
};

export const useCapture = () => {
  const { capture } = useContext(CaptureContext);

  return { capture };
};
