import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";

export default function Places ({ setLocation }) {

    const {
        ready,
        value,
        setValue, 
        suggestions: {status, data},
        clearSuggestions,
    } = usePlacesAutocomplete()

    return (
        <Combobox onSelect = {() => {}}>
            <ComboboxInput value = {value} onChange = {e => setValue(e.target.value)}
            className = "comboobox-input"
            placeholder = "Enter location..."
            ></ComboboxInput>
        </Combobox>
    )
}