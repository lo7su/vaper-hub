import AppState from "../../state/appState/AppState.js";
import {Typography} from "@material-tailwind/react";

const CatalogItem = (props) => {
    return (
        <figure className="relative sm:h-38 sm:w-full md:h-64 md:w-[420px] p-3">
            <img
                className="h-full w-full rounded-xl object-cover object-center"
                src={AppState.mediaPath + props.imageSrc}
                alt="nature image"
            />
            <figcaption
                className="absolute bottom-4 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-md border border-white bg-white/60 py-2  px-6 mb-3 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <div>
                    <Typography variant="h5" color="blue-gray">
                        {props.mainTitle}
                    </Typography>
                    {props.secondTitle? <Typography color="gray" className=" font-normal">
                        {props.secondTitle}
                    </Typography>
                    : <></> }

                </div>
            </figcaption>
        </figure>
    );
}

export default CatalogItem;
