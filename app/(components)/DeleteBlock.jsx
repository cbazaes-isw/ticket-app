"use client";

import { faX } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");

const DeleteBlock = ({ id }) => {
  const router = useRouter();

  const deleteTicket = async (id) => {
    const response = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      method: "delete",
    });
    if (!response.ok) {
      throw new Error("Failed to delete ticket", error);
    }

    router.refresh();
  };

  return (
    <FontAwesomeIcon
      icon={faX}
      className="text-red-400 hover:cursor-pointer hover:text-red-200"
      onClick={() => deleteTicket(id)}
    />
  );
};

export default DeleteBlock;
