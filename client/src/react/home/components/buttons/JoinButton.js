import { useDispatch, useSelector } from "react-redux"

import HomeFormButton from "../../../common/components/FormButton"
import { join } from "../../HomeLogic"

export default function JoinButton(props) {
    const dispatch = useDispatch();

    return <HomeFormButton text="Join" variant="primary"
        onClick={() => join(props.party, dispatch)}
    />
}
