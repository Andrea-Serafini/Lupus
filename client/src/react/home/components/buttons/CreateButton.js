import { useDispatch, useSelector } from "react-redux"

import HomeFormButton from "../../../common/components/FormButton"
import { join } from "../../HomeLogic"

export default function SignupButton(props) {
    const dispatch = useDispatch()

    return <HomeFormButton text="Create" variant="secondary"
        onClick={() => join(props.party, dispatch)}
    />
}
