import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export function useKeyboardOpen() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => setIsOpen(true));
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setIsOpen(false)
    );

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return isOpen;
}
