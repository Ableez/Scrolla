import {
  StyleSheet,
  View,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, {
  ReactNode,
  useCallback,
  createContext,
  useContext,
  useMemo,
  useRef,
} from "react";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
  useBottomSheetModal,
  BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import BouncyButton from "./bouncy-button";

// Types
type DrawerContextType = {
  dismiss: () => void;
  present: () => void;
};

// Context
const DrawerContext = createContext<DrawerContextType | null>(null);

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("Drawer components must be wrapped in <Drawer />");
  }
  return context;
};

// Root Component
type DrawerProps = {
  children: ReactNode;
  snapPoints?: string[] | number[];
  onChange?: (index: number) => void;
  customBottomSheetRef?: React.RefObject<BottomSheetModal>;
} & BottomSheetModalProps;

const Drawer = ({
  children,
  snapPoints = ["30%"],
  onChange,
  customBottomSheetRef,
  ...props
}: DrawerProps) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { dismiss } = useBottomSheetModal();

  const present = useCallback(() => {
    if (customBottomSheetRef) {
      customBottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.present();
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      dismiss,
      present,
    }),
    [dismiss, present]
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  // Find DrawerContent and other children
  let drawerContent: React.ReactNode | null = null;
  const triggerContent: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === DrawerContent) {
        drawerContent = child.props.children;
      } else {
        triggerContent.push(child);
      }
    }
  });

  return (
    <DrawerContext.Provider value={contextValue}>
      {triggerContent}
      <BottomSheetModal
        ref={customBottomSheetRef ?? bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={onChange}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={styles.indicator}
        animationConfigs={{
          duration: 310,
        }}
        {...props}
      >
        <BottomSheetView style={styles.content}>
          {drawerContent}
        </BottomSheetView>
      </BottomSheetModal>
    </DrawerContext.Provider>
  );
};

// Content Component
interface DrawerContentProps {
  children: ReactNode;
  style?: any;
}

const DrawerContent = ({ children, style }: DrawerContentProps) => {
  return children;
};

// Trigger Component
interface DrawerTriggerProps {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const DrawerTrigger = ({ children, onPress, style }: DrawerTriggerProps) => {
  const { present } = useDrawer();

  return (
    <BouncyButton
      style={[styles.trigger, style]}
      onPress={() => {
        present();
        onPress?.();
      }}
    >
      {children}
    </BouncyButton>
  );
};

// Header Component
interface DrawerHeaderProps {
  children: ReactNode;
  style?: any;
}

const DrawerHeader = ({ children, style }: DrawerHeaderProps) => (
  <View style={[styles.header, style]}>{children}</View>
);

// Footer Component
interface DrawerFooterProps {
  children: ReactNode;
  style?: any;
}

const DrawerFooter = ({ children, style }: DrawerFooterProps) => (
  <View style={[styles.footer, style]}>{children}</View>
);

// Close Button Component
interface DrawerCloseProps {
  children: ReactNode;
  onPress?: () => void;
  style?: any;
}

const DrawerClose = ({ children, onPress, style }: DrawerCloseProps) => {
  const { dismiss } = useDrawer();

  return (
    <Pressable
      style={[styles.closeButton, style]}
      onPress={() => {
        dismiss();
        onPress?.();
      }}
    >
      {children}
    </Pressable>
  );
};

// Title Component
interface DrawerTitleProps {
  children: ReactNode;
  style?: any;
}

const DrawerTitle = ({ children, style }: DrawerTitleProps) => (
  <View style={[styles.title, style]}>{children}</View>
);

// Description Component
interface DrawerDescriptionProps {
  children: ReactNode;
  style?: any;
}

const DrawerDescription = ({ children, style }: DrawerDescriptionProps) => (
  <View style={[styles.description, style]}>{children}</View>
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e5e5",
  },
  footer: {
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e5e5e5",
  },
  closeButton: {
    padding: 8,
  },
  trigger: {
    padding: 8,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 16,
  },
  indicator: {
    width: 40,
    height: 4,
    backgroundColor: "#e5e5e5",
    alignSelf: "center",
    marginTop: 8,
    borderRadius: 2,
  },
});

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
};
