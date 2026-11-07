import pageLoader from '@/src/actions/loaders/pageLoader';
import Modal from '@/src/components/common/modals/Modal';
import API from '@/src/lib/API';
import toast from '@/src/lib/toast';
import type { CompanyProfile } from '@/src/types/entities/company/companyProfile.types';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
    handleClose: () => void;
    handleUpdateLogo: () => void;
};

const ConfirmLogoDeleteModal = ({handleClose, handleUpdateLogo}: Props) => {
    const queryClient = useQueryClient();

    const handleConfirmDelete = async () => {
        try {
            pageLoader.show("Removing company logo");

            await API.delete("/comany/logo");

            handleUpdateLogo();

            queryClient.setQueryData(["company-profile"], (oldProfile: CompanyProfile): CompanyProfile => {
                if (!oldProfile) return oldProfile;

                return {
                    ...oldProfile,
                    profile_top: {
                        ...oldProfile.profile_top,
                        logo_url: null
                    }
                };
            });

            toast.error("Logo removed successfully");
        } catch (error) {
            toast.error("Soemthing went wrong, please try again");
        } finally {
            pageLoader.close();
        };
    };

    return (
        <Modal title="Confirm logo deletion">
            <h1>Are you sure you want to delete your company logo?</h1>

            <div className="flex justify-end items-center gap-2 mt-4">
                <button className='btn' onClick={handleClose}>Close</button>
                <button className='btn' onClick={handleConfirmDelete}>Confirm</button>
            </div>
        </Modal>
    );
};

export default ConfirmLogoDeleteModal;