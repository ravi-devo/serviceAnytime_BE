const Ticket = require("../model/ticketModel");
const User = require('../model/userModel');

const ticketController = {
    createTicket: async (req, res) => {
        try {
            const userId = req.user._id;
            const { title, description } = req.body;
            const user = await User.findById(userId);
            const response = await Ticket.create(
                {title, description, createdBy: userId, requestor: user.name, requestorEmail: user.username, assignee: ''});
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
            const currentUser = req.user;
            const {status, assignee, requestorEmail} = req.body;
            //Requestor can resolve it without assignee but others cannot
            if(status === 'Resolved' && requestorEmail !== currentUser.username){
                if(assignee === ''){
                    return res.json({message: "While resolving the ticket updating assignee is mandatory, please assign it to yourself and resolve it."})
                }  
            }
            if(assignee !== ''){
                const checkValidAssignee = await User.findOne({username: assignee});
                if(!checkValidAssignee) return res.json({message: "Assignee is not a valid email, please enter your assignee email correctly"})
                else if(!checkValidAssignee.isAdmin){
                    return res.json({message: "Assignee should be an admin, you cannot assign a ticket to the user(non-admin)"})
                }
            }
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