import EditActions from "@/src/components/common/edit/EditActions";
import CharacterCounter from "@/src/components/common/inputs/CharacterCounter";
import { CompanyProfile } from "@/src/types/entities/company/companyProfile.types";
import { useState } from "react";

interface Props {
    data: CompanyProfile["profile_top"];
};

const ProfileTop = ({ data }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(data);

    return (
        <section className="p-6 rounded-md border border-border-primary bg-bg-primary">
            <EditActions
                handleEditing={(opt: boolean) => {
                    if (!opt) setProfile(data);
                    setIsEditing(opt)
                }}
                handleOnSave={() => null}
                isEditing={isEditing}
                isLoading={false}
                title="Company Profile"
            />

            <div className="flex gap-4 mt-6">
                <div>
                    <div className="h-44 w-44 rounded-lg grid place-items-center bg-bg-primary border-2 border-dashed border-border-primary">
                        <span className="text-center text-sm font-medium text-text-tertiary">Company Logo</span>
                    </div>
                </div>

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
            </div>

        </section>
    );
};

export default ProfileTop;