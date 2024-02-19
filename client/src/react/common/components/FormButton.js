import { useSelector } from "react-redux"

import Button from "react-bootstrap/Button"

export default function FormButton(props) {
    let isLoading = useSelector(state => state.util.isLoading)
    return (
        <Button
            style={isLoading ? { pointerEvents: "none", opacity: "0.4" } : {}}
            className="col-12 mt-3"
            variant={props.variant}
            size="lg"
            block="true"
            onClick={props.onClick}
        >
            {props.text}
        </Button>
    )
}
