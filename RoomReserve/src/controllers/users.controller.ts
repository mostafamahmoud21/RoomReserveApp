// import { Request, Response } from "express";
// import { getAllUsers, deleteUser, addNewUser, updateUserById } from '../services/users.service'

// export const getUsers = async (req: Request, res: Response) => {
//     try {
//         const users = await getAllUsers()
//         res.status(200).json(users)
//     } catch (error) {
//         res.status(500).json({ message: "error" })
//     }
// }

// export const deleteUserById = async (req: Request, res: Response) => {
//     const id = req.params.id
//     try {
//         const users = await deleteUser(+id)
//         res.status(200).json({ message: `user has been deleted!` })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: "error" })
//     }
// }

// export const addUser = async (req: Request, res: Response) => {
//     const { name, email, isAdmin } = req.body
//     try {
//         const users = await addNewUser({ name, email, isAdmin })
//         res.status(201).json({ msg: 'user added success', users })
//     } catch (error) {
//         const errMsg = error instanceof Error ? error.message : String(error)
//         if (errMsg == "Email already exists") {
//             return res.status(400).json({ message: errMsg });
//         }
//         res.status(500).json({ message: "Internal server error", error: errMsg });
//     }
// }

// export const updateUser = async (req: Request, res: Response) => {
//     const { id } = req.params
//     const { name, isAdmin } = req.body
//     try {
//         const users = await updateUserById({ id: +id, data: { name, isAdmin } })
//         res.status(200).json({ msg: 'user update success', users })
//     } catch (error) {
//         res.status(500).json({ message: "error" })
//     }
// }