import "./profileIcon.css"
import { useState } from "react";
import profile from "../../../assets/profile.svg"
import { OffCanvasEx } from "./OffCanvassMenu/OffCanvasMenuBurger"
import { Modal, Button } from "react-bootstrap";
import useSession from "../../../hooks/useSession";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export const ProfileIcon = () => {
    const [showModal, setShowModal] = useState(false);
    const session = useSession();
    const navigate = useNavigate();

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleDeleteAccount = async () => {
        const result = await Swal.fire({
            title: 'Sei sicuro?',
            text: "Questa azione non può essere annullata!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sì, elimina account',
            cancelButtonText: 'Annulla',
            background: '#1a1a1a',
            color: '#fff'
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                
                const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL_EPI}/users/delete/${session.userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': token
                    }
                });

                if (response.ok) {
                    localStorage.removeItem('token');
                    Swal.fire({
                        title: 'Account eliminato',
                        text: 'Il tuo account è stato eliminato con successo',
                        icon: 'success',
                        confirmButtonColor: '#ff7f11',
                        background: '#1a1a1a',
                        color: '#fff'
                    });
                    navigate('/');
                    window.location.reload();
                }
            } catch (error) {
                Swal.fire({
                    title: 'Errore!',
                    text: 'Errore durante l\'eliminazione dell\'account',
                    icon: 'error',
                    confirmButtonColor: '#ff7f11',
                    background: '#1a1a1a',
                    color: '#fff'
                });
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center gap-2 p-1 profileCustom">
            <div onClick={handleShow} style={{ cursor: 'pointer' }}>
                <img src={profile} alt="profile" />
            </div>

            <OffCanvasEx/>

            <Modal 
                show={showModal} 
                onHide={handleClose}
                centered
                className="text-white"
            >
                <Modal.Header closeButton className="bg-dark border-secondary">
                    <Modal.Title>Profilo Utente</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark">
                    {session ? (
                        <div className="d-flex flex-column gap-2">
                            <p><strong>Nome:</strong> {session.name}</p>
                            <p><strong>Email:</strong> {session.email}</p>
                            {session.surname && (
                                <p><strong>Cognome:</strong> {session.surname}</p>
                            )}
                            <p><strong>Stato:</strong> {session.isActive ? 'Attivo' : 'Non attivo'}</p>
                            <p><strong>Registrato il:</strong> {new Date(session.createdAt).toLocaleDateString()}</p>
                            
                            <div className="d-flex justify-content-end mt-3">
                                <Button 
                                    variant="danger"
                                    onClick={handleDeleteAccount}
                                >
                                    Elimina Account
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <p>Effettua il login per vedere i tuoi dati</p>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    )
}