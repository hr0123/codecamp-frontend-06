import { useState } from "react";
import DaumPostCode from "react-daum-postcode";

export default function PostcodePage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (data) => {
    console.log(data);
    setIsOpen(false);
  };
  return <DaumPostCode onComplete={handleComplete} />;
}
