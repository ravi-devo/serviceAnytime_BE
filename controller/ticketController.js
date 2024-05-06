const Ticket = require("../model/ticketModel");

const ticketController = {
    createTicket: async (req, res) => {
        try {
            const userId = req.user._id;
            const { title, description } = req.body;
            const response = await Ticket.create({title, description, createdBy: userId});
            res.status(201).json({ message: "Ticket logged successfully", data: response})
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error });
        }
    },
    getSpecificTicket: async (req, res) => {
        try {
            const ticketId = req.params.id;
            const response = await Ticket.findById(ticketId);
            res.status(200).json({ message: "Ticket fetched successfully", data: response });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error });
        }
    },
    getUserSpecificTicket: async (req, res) => {
        try {
            const userId = req.user._id;
            const response = await Ticket.find({ createdBy: userId });
            res.status(200).json({ message: "Tickets fetched successfully", data: response });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error });
        }
    },
    getAllTickets: async (req, res) => {
        try {
            const response = await Ticket.find();
            res.status(200).json({ message: "Tickets fetched successfully", data: response });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error });
        }
    },
    updateTicket: async (req, res) => {
        try {
            const ticketId = req.params.ticketId;
            const response = await Ticket.findByIdAndUpdate(ticketId, req.body, {new: true});
            res.status(200).json({ message: "Ticket updated successfully", data: response });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error });
        }
    },
    deleteTicket: async (req, res) => {
        try {
            const ticketId = req.params.ticketId;
            const ticket = await Ticket.findOne({ _id: ticketId });
            if(ticket.status === 'Resolved'){
                await Ticket.findByIdAndDelete(ticketId);
                return res.status(200).json({ message: "Ticket deleted successfully", data: ticket });
            }else{
                return res.json({ message: "The ticket is open, please resolve it and then proceed to delete" });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error });
        }
    }
}

module.exports = ticketController;