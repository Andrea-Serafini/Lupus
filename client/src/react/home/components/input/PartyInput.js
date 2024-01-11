import { useDispatch, useSelector } from "react-redux"

import HomeFormInput from "../../../common/components/FormInput"
import { join } from "../../HomeLogic"

export default function PartyInput(props) {

    const dispatch = useDispatch()


    return <HomeFormInput
        text="Party:"
        type="text"
        placeholder="Enter party code"
        onChange={props.onChange}
        onEnter={() => join(props.party, dispatch)}
    />

}
