import AppState from "../../state/appState/AppState.js";
import {Typography} from "@material-tailwind/react";

const CatalogItemMini = (props) => {
    return (
        <figure className="relative p-3">
            <img
                className="h-48 w-48 max-w-40 max-h-40 rounded-xl object-cover object-center"
                src={AppState.mediaPath + props.imageSrc}
                alt="nature image"
            />
            <figcaption
                className="absolute bottom-4 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 mb-2 justify-center rounded-md border border-white bg-white/60 py-1 px-1 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <div>
                    <Typography variant="small" color="blue-gray">
                        {props.mainTitle}
                    </Typography>
                </div>
            </figcaption>
        </figure>
    );
}

export default CatalogItemMini;
