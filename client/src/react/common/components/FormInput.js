import { useSelector } from "react-redux"

import Form from "react-bootstrap/Form"


export default function FormInput(props) {
    return (
        <>
            <h3 style={{ color: "white" }}>{props.text}</h3>
            <Form.Control
                className="mb-lg-3"
                style={useSelector(state => state.util.isLoading) ? { pointerEvents: "none", opacity: "0.4" } : {}}
                type={props.type}
                onChange={e => props.onChange(e.target.value)}
                placeholder={props.placeholder}
                onKeyUp={event => { if (event.key === "Enter") props.onEnter() }}
            />
        </>
    )
}
