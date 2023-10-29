import TicketForm from "@/app/(components)/TicketForm";

const getTicketByID = async (id) => {
  const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to get ticket");

  return res.json();
};

const TicketPage = async ({ params }) => {
  const EDIT_MODE = params.id !== "new";

  let updateTicket = {};
  if (EDIT_MODE) {
    updateTicket = (await getTicketByID(params.id)).ticket;
    console.log(updateTicket);
  } else {
    updateTicket = {
      _id: "new",
    };
  }

  return <TicketForm ticket={updateTicket} />;
};

export default TicketPage;
