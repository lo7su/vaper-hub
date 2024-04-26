import React, { useState, useEffect } from "react";
import { Alert, Button } from "@material-tailwind/react";
import { observer } from "mobx-react";
import AppState from "../../state/appState/AppState.js";

const SmallAlert = observer(() => {

    return (
        <>
            <div className={'flex justify-center'}>
                <Alert
                    className={'absolute bottom-8 w-96'}
                    open={AppState.smallAlert}
                    onClose={() => {AppState.closeAddToCartAlert()}}
                    animate={{
                        mount: { y: 0 },
                        unmount: { y: 100 },
                    }}
                >
                    {AppState.smallAlertMessage}
                </Alert>
            </div>
        </>
    );
});

export default SmallAlert;
