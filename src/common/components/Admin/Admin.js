import { useEffect, useState } from "react"
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { clearAdminData } from "../../signals/AdminSignal";
import '../../constants/public_env'
import { ENV } from "../../constants/public_env";
import { LOCALIZATION } from "../../constants/fi";

export default function Admin() {
    const [adminUserName, setAdminUserName] = useState("")
    const [categoryName, setCategoryName] = useState("")
    const [categoryDescription, setCategoryDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("")

    const navigate = useNavigate();

    /**
     * Submits new category
     */
    const submitCategory = async (event) => {
        event.preventDefault()

        if (categoryName === "" || categoryDescription === "") {
            alert("Lisää kategorian nimi ja kuvaus!");
            return;
        }

        try {
            const body = [{ categoryName: categoryName, description: categoryDescription, imageUrl: imageUrl }];
            await axios.post(`${ENV.BACKEND}/categories`, body);
            alert("Kategoria " + categoryName + " lisätty.");
        } catch (error) {
            console.error(error);
        }

        setCategoryName("");
        setCategoryDescription("");
    };

    /**
     * Log admin out and clear signal.
     */
    const adminLogout = () => {
        try {
            clearAdminData();
            navigate("/");
            console.log('Admin logged out.');
        } catch (error) {
            console.log("Error loggin admin out.")
            navigate("/");
        }
    };

    useEffect(() => {
        try {
            const adminData = JSON.parse(sessionStorage.adminData);

            if (adminData && adminData.adminLoggedIn) {
                // console.log("Admin has logged in!");
                setAdminUserName(adminData.userName);
            }
            else {
                const msg = "Access fordbidden";
                // console.log(msg);
                throw new Error(msg)
            }
        } catch (error) {
            console.log(error);
            navigate("/");
        }
    }, []);


    return (
        <div>
            <div id="adminHeader">
                <h1>Welcome {adminUserName}</h1>
                <Button variant="warning" onClick={adminLogout} >{LOCALIZATION.LOGOUT}</Button>
                <hr></hr>
            </div>
            <h3>{`${LOCALIZATION.ADD} ${LOCALIZATION.CATEGORY.toLowerCase()}`}</h3>
            <Form>
                <Form.Group className="mb-3" id="categoryNameContainer">
                    <Form.Label>{`${LOCALIZATION.NAME}`}</Form.Label>
                    <Form.Control
                        size="lg"
                        type="text"
                        id="categoryNameText"
                        value={categoryName}
                        placeholder="Aseta nimi"
                        onChange={(e) => setCategoryName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" id="categoryImageContainer">
                    <Form.Label>{`${LOCALIZATION.IMAGE}`}</Form.Label>
                    <Form.Control
                        size="lg"
                        type="text"
                        id="categoryImageText"
                        value={imageUrl}
                        placeholder={`${LOCALIZATION.PLACE} ${LOCALIZATION.IMAGE.toLowerCase()}`}
                        onChange={(e) => setImageUrl(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" id="categoryDescriptionContainer">
                    <Form.Label>{`${LOCALIZATION.DESCRIPTION}`}</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={categoryDescription}
                        placeholder={`${LOCALIZATION.PLACE} ${LOCALIZATION.CATEGORY.toLowerCase()} ${LOCALIZATION.DESCRIPTION.toLocaleLowerCase()}`}
                        onChange={(e) => setCategoryDescription(e.target.value)} />
                    <Button
                        variant="success"
                        id="submitButton"
                        type="submit"
                        onClick={(e) => submitCategory(e)}>
                        {LOCALIZATION.SUBMIT}
                    </Button>
                </Form.Group>
            </Form>
            <hr></hr>
            <h3>{`${LOCALIZATION.ADD} ${LOCALIZATION.PRODUCT}`}</h3>
            <h2>TBD</h2>
        </div>
    );
}