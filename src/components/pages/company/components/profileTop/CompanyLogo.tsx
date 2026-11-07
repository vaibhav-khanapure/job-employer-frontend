import Image from 'next/image';
import { LuTrash2 } from 'react-icons/lu';
import { VscEditCompact } from 'react-icons/vsc';
import handleSelectLogo from '../../actions/profileTop/handleSelectLogo';
import pageLoader from '@/src/actions/loaders/pageLoader';
import toast from '@/src/lib/toast';
import { useQueryClient } from '@tanstack/react-query';
import type { CompanyProfile } from '@/src/types/entities/company/companyProfile.types';
import API from '@/src/lib/API';

interface Props {
    isEditing: boolean;
    logo_url: string | null;
    handleRemoveLogo: () => void;
    handleSetLogo: (img: string) => void;
};

const CompanyLogo = ({ isEditing, logo_url, handleRemoveLogo, handleSetLogo }: Props) => {
    const queryClient = useQueryClient();

    const handleUploadLogo = async () => {
        try {
            if (!logo_url) {
                return toast.error("Please select a logo first");
            };

            const form = new FormData();

            form.append("logo", logo_url);

            pageLoader.show("Uploading logo");

            const { data } = await API.patch("/company/logo", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (data?.logo) {
                handleSetLogo(data?.logo);

                queryClient.setQueryData(["company-profile"], (oldProfile: CompanyProfile): CompanyProfile => {
                    if (!oldProfile) return oldProfile;

                    return {
                        ...oldProfile,
                        profile_top: {
                            ...oldProfile.profile_top,
                            logo_url: data?.logo
                        }
                    };
                });

                toast.success("Logo updated successfully");
            };
        } catch (error) {
            toast.error("Failed to upload logo");
        } finally {
            pageLoader.close();
        };
    };

    return (
        <div>
            <div className="h-44 w-44 relative rounded-lg overflow-hidden grid place-items-center bg-bg-primary border-2 border-dashed border-border-primary">
                {logo_url ? (
                    <Image
                        className="size-full"
                        src={logo_url}
                        height={176}
                        width={176}
                        alt="company_logo"
                    />
                ) : (
                    <span className="text-center text-sm font-medium text-text-tertiary">Company Logo</span>
                )}

                {isEditing && (
                    <div className="absolute bottom-0 left-0 w-full p-2 flex items-center justify-end gap-2 *:size-8 *:rounded-full *:grid *:place-items-center *:bg-white *:hover:shadow-xl *:cursor-pointer *:border *:border-border-primary">
                        <label htmlFor="upload-logo">
                            <VscEditCompact />
                        </label>
                        {logo_url && (
                            <div onClick={handleRemoveLogo}>
                                <LuTrash2 />
                            </div>
                        )}
                    </div>
                )}
            </div>

            <input
                type="file"
                id="upload-logo"
                hidden
                accept="image/*"
                onChange={(e) => handleSelectLogo(e, (img: string) => handleSetLogo(img))}
            />

            {(isEditing && logo_url) && (
                <button className="btn rounded-full text-xs cursor-pointer mt-2" onClick={handleUploadLogo}>Upload</button>
            )}
        </div>
    );
};

export default CompanyLogo;