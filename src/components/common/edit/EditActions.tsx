"use client";

import { BiEdit } from "react-icons/bi";
import { Fragment, useState } from "react";
import Spinner from "../loaders/Spinner";

interface Props {
    handleOnSave: () => void;
    isLoading: boolean;
    title?: string;
};

const EditActions = ({ handleOnSave, isLoading, title }: Props) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className={`flex items-center ${title ? "justify-between" : "justify-end"}`}>
            {title && <h5 className="font-semibold text-primary/80">{title}</h5>}

            {isLoading ? <Spinner /> : (
                <Fragment>
                    {isEditing ? (
                        <div className="flex gap-2 items-center justify-end">
                            <button className="btn text-xs" onClick={() => handleOnSave && handleOnSave()}>Save</button>
                            <button className="btn text-xs bg-gray-400" onClick={() => setIsEditing(false)}>
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            className="size-10 rounded-full grid place-items-center hover:bg-gray-50"
                            onClick={() => setIsEditing(true)}
                        >
                            <BiEdit size={20} />
                        </button>
                    )}
                </Fragment>
            )}
        </div>
    );
};

export default EditActions;