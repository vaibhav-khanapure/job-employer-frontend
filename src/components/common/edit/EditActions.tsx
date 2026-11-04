"use client";

import { BiEdit } from "react-icons/bi";
import { Fragment, useState } from "react";
import Loaders from "../loaders/loaders";
import COLORS from "@/src/constants/colors";

interface Props {
    handleOnSave: () => void;
    isLoading: boolean;
    subtitle?: string;
    title?: string;
};

const EditActions = ({ handleOnSave, isLoading, subtitle, title }: Props) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className={`flex items-center pb-2 border-b border-border-primary ${title ? "justify-between" : "justify-end"}`}>
            {title && (
                <div>
                    <h5 className="font-bold text-lg text-text-primary/80">{title}</h5>
                    <p className="text-sm text-text-muted">{subtitle}</p>
                </div>
            )}

            {isLoading ? <Loaders.Spinner color={COLORS.PRIMARY} /> : (
                <Fragment>
                    {isEditing ? (
                        <div className="flex gap-2 items-center justify-end">
                            <button
                                className="btn text-xs transition duration-200 hover:-translate-y-1"
                                onClick={() => handleOnSave && handleOnSave()}
                            >
                                Save
                            </button>
                            <button
                                className="btn text-text-primary text-xs bg-bg-secondary transition duration-200 hover:-translate-y-1"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            className="size-10 rounded-full grid place-items-center hover:bg-bg-secondary"
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