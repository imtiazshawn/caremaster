import { useState } from "react";

const useModalHook = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDescription, setModalDescription] = useState<string>("");
  return { isModalOpen, setIsModalOpen, modalDescription, setModalDescription };
};

export default useModalHook;
