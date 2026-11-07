import EditActions from "@/src/components/common/edit/EditActions";
import CharacterCounter from "@/src/components/common/inputs/CharacterCounter";
import API from "@/src/lib/API";
import toast from "@/src/lib/toast";
import { CompanyProfile } from "@/src/types/entities/company/companyProfile.types";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CompanyLogo from "./profileTop/CompanyLogo";
import ConfirmLogoDeleteModal from "./modals/ConfirmLogoDeleteModal";

interface Props {
    data: CompanyProfile["profile_top"];
};

const ProfileTop = ({ data }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(data);
    const [showRemoveLogoModal, setShowRemoveConfirmLogoModal] = useState(false);

    useEffect(() => {
        return () => {
            if (profile?.logo_url?.startsWith("blob:")) {
                URL.revokeObjectURL(profile.logo_url);
            };
        };
    }, [profile?.logo_url]);

    const { } = useMutation({

    });

    const { isPending, mutate } = useMutation({
        mutationFn: (data: Partial<CompanyProfile["profile_top"]>) => API.patch('/company', data),
        onSuccess: () => {
            toast.success('Profile updated successfully');
            setIsEditing(false);
        },
        onError: (error) => toast.error(error?.errorMessage),
        onSettled: () => setIsEditing(false)
    });

    const handleRemoveLogo = async () => {
        if (!data?.logo_url) {
            return setProfile(prev => ({ ...prev, logo_url: data?.logo_url }));
        };

        setShowRemoveConfirmLogoModal(true);
    };

    return (
        <section className="p-6 rounded-md border border-border-primary bg-bg-primary">
            <EditActions
                handleOnSave={() => null}
                isEditing={isEditing}
                isLoading={false}
                title="Company Profile"
                handleEditing={(opt: boolean) => {
                    if (!opt) setProfile(data);
                    setIsEditing(opt)
                }}
            />

            {showRemoveLogoModal && (
                <ConfirmLogoDeleteModal
                    handleClose={() => setShowRemoveConfirmLogoModal(false)}
                    handleUpdateLogo={() => setProfile(prev => ({ ...prev, logo_url: null }))}
                />
            )}

            <div className="flex gap-4 mt-6">

                <CompanyLogo
                    handleRemoveLogo={handleRemoveLogo}
                    logo_url={profile?.logo_url}
                    isEditing={isEditing}
                    handleSetLogo={(img: string) => setProfile(prev => ({ ...prev, logo_url: img }))}
                />

                <div className="flex flex-col gap-4 w-full">
                    {/* Company Name */}
                    <div className="space-y-2">
                        <label htmlFor="company-name" className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                            Company Name
                        </label>

                        <input
                            className={`input text-3xl rounded-none font-bold tracking-tight ${isEditing
                                ? "border-0 border-b border-b-border-primary focus:border-b-secondary"
                                : "border-0"}`
                            }
                            disabled={!isEditing}
                            id="company-name"
                            minLength={1}
                            maxLength={500}
                            value={profile?.name}
                            onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        />

                        {isEditing && <CharacterCounter maxLength={500} text={profile?.name} />}
                    </div>

                    {/* Company Tagline */}
                    <div className="space-y-3">
                        <label
                            htmlFor="company-tagline"
                            className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted"
                        >
                            Company Tagline
                        </label>

                        <textarea
                            className={`input text-[15px] leading-7 resize-none field-sizing-content ${isEditing
                                ? "border-0 border-b border-b-border-primary focus:border-b-secondary rounded-none"
                                : "border-0"
                                } ${!profile?.tagline ? "italic" : ""}`
                            }
                            id="company-tagline"
                            disabled={!isEditing}
                            maxLength={600}
                            rows={1}
                            placeholder="Add a short tagline about your company"
                            value={profile?.tagline ?? ""}
                            onChange={(e) => setProfile(prev => ({ ...prev, tagline: e.target.value }))}
                        />

                        {isEditing && <CharacterCounter maxLength={500} text={profile?.tagline ?? ""} />}
                    </div>
                </div>
            </div >

        </section>
    );
};

export default ProfileTop;