"use client";

import EditActions from "@/src/components/common/edit/EditActions";

const ProfileTop = () => {
    return (
        <section className="p-6 rounded-md border border-zinc-200">
            <EditActions
                handleOnSave={() => null}
                isLoading={false}
                title="Company Profile"
            />

            <div className="flex gap-4 mt-6">
                <div className="">
                    <div className="h-44 w-44 rounded-lg grid place-items-center bg-white border-2 border-dashed border-gray-300">
                        <span className="text-center text-sm font-medium text-neutral-500">Company Logo</span>
                    </div>
                </div>

                <div className="flex flex-col gap-7">
                    {/* Company Name */}
                    <div className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                            Company Name
                        </span>

                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <h4 className="text-4xl font-bold tracking-tight text-gray-900">
                                Jobble
                            </h4>

                            <span className="text-sm font-medium text-gray-400">
                                @jobble-jsjsjjd
                            </span>
                        </div>
                    </div>

                    {/* Company Tagline */}
                    <div className="space-y-3">
                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                            Company Tagline
                        </span>

                        <p className="max-w-2xl text-[15px] leading-7 text-gray-600">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Nisi natus dignissimos quis fugit quia autem omnis debitis
                            laudantium repellendus quaerat illum, atque aliquam
                            blanditiis quidem ipsam unde cumque cum eaque deleniti.
                        </p>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default ProfileTop;