import { useState } from "react";
import { Alert, Typography } from "@material-tailwind/react";
import ClickAwayListener from "react-click-away-listener";
import { observer } from "mobx-react";

function IconOutlined() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
        </svg>
    );
}

const ConnectionAlert = observer(({ isOpen }) => {
    const [visible, setVisible] = useState(true);

    const hideAlert = () => {
        setVisible(false);
    };

    if (!isOpen || !visible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <ClickAwayListener onClickAway={hideAlert}>
                <Alert icon={<IconOutlined />} className="w-11/12">
                    <Typography className="font-medium">
                        Возникли проблемы с соединением:
                    </Typography>
                    <ul className="mt-2 ml-2 list-inside list-disc">
                        <li>Проверьте подключение к интернету</li>
                        <li>Попробуйте открыть приложение заново</li>
                        <li>Попробуйте позже или обратитесь к администратору</li>
                    </ul>
                </Alert>
            </ClickAwayListener>
        </div>
    );
});

export default ConnectionAlert;
