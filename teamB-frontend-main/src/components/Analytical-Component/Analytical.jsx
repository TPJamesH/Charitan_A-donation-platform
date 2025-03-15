import React from "react";
import useGetListAnalytic from "./hook/useGetListAnalytics";
import getTotalProject from "./api/getTotalProject";
import getTotalDonation from "./api/getTotalDonation";
import HeadlessCard from "../Headless/Card/HeadlessCard";
import { Modal } from "../Headless/Modal/Modal";
import { data, options } from "../Analytical-Component/dummy_data"
import HeadlessChart from "../Headless/Chart/HeadlessChart";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart, CategoryScale } from 'chart.js/auto';
import { UserDefinedDropdown } from "../Headless/Dropdown/Dropdown";
import { Table } from "../Headless/Table/Table";
import TimeInput from "./child_component/timeInput";
import { UserDefinedCombobox } from "../Headless/Combox/UserDefinedCombobox";
import getAllCharities from "./api/getAllCharity";
import getAllDonors from "./api/getAllDonor";
import getProjectDonationOfCharity from "./api/getProjectDonationOfCharity";
import getProjectDonationOfDonor from "./api/getProjectDonationOfDonor";
import getDonorRegistration from "./api/getDonorRegistration";
import ModalStyle from "../presentation/ModalStyle";
import CardStyle from "../presentation/CardStyle";
import ChartGenerator from "./helper/LineChartGenerator";
import PieChartGenerator from "./helper/PieChartGenerator";
import BarChartGenerator from "./helper/BarChartGenerator";
import getTotalProjectStatus from "./api/getTotalProjectStatus";
import useGetComparisonAnalytic from "./hook/useGetComparisonAnalytic";
import getProjectComparison from "./api/getProjectComparison";
import getAllCategories from "./api/getCategory";
import getAllRegion from "./api/getRegion";
import { Button } from "../Headless/Button/Button";

const Analytical = () => {
    const { defaultButtonLabel,
        defaultButtonClass,
        defaultModalClass,
        defaultPanelClass,
        defaultTitleClass } = ModalStyle()

    const { styleClass, titleClass } = CardStyle()
    Chart.register(CategoryScale);
    const { value: totalProject, category: totalProjectCategory, setCategory: setTotalProjectCategory, fetchValue: fetchTotalProject, fetchValueInput: fetchInputTotalProject, setValue: setTotalProject } = useGetListAnalytic(getTotalProject)
    const { value: totalProjectStatus, fetchValue: fetchProjectStatus, fetchValueInput: fetchInputProjectStatus } = useGetListAnalytic(getTotalProjectStatus)
    const { value: totalDonation, category: totalDonationCategory, setCategory: setTotalDonationCategory, fetchValue: fetchTotalDonation, fetchValueInput: fetchInputTotalDonation, setValue: setTotalDonation } = useGetListAnalytic(getTotalDonation)
    const { value: donorStat, fetchValue: fetchDonorStat, fetchValueInput: fetchInputDonorStat, setValue: setDonorStat } = useGetListAnalytic(getProjectDonationOfDonor)
    const { value: charityStat, fetchValue: fetchCharityStat, fetchValueInput: fetchInputCharityStat, setValue: setCharityStat } = useGetListAnalytic(getProjectDonationOfCharity)

    const { value: totalDonors, fetchValue: fetchTotalDonors, setValue: setTotalDonors } = useGetListAnalytic(getAllDonors)
    const { value: totalCharities, fetchValue: fetchTotalCharities, setValue: setTotalCharities } = useGetListAnalytic(getAllCharities)

    const { value: totalCategories, fetchValue: fetchTotalCategories, setValue: setTotalCategories} = useGetListAnalytic(getAllCategories)
    const { value: totalRegion, fetchValue: fetchTotalRegion, setValue: setTotalRegion } = useGetListAnalytic(getAllRegion)

    const { value: donorRegistration, fetchValue: fetchDonorRegistration, fetchValueInput: fetchInputDonorRegistration, setValue: setDonorRegistration } = useGetListAnalytic(getDonorRegistration)
    const {value: comparison, inputs: inputComparison, handleInputChange: inputComparisonChange, fetchValueInput: fetchComparisonInput, setValue: setComparison} = useGetComparisonAnalytic(getProjectComparison)

    ////////////////////////////////////////////////////////////////////////
    const currentDonor = localStorage.getItem("currentDonor")?localStorage.getItem("currentDonor"): "(Not chosen)"
     const currentCharity = localStorage.getItem("currentCharity")?localStorage.getItem("currentCharity"): "(Not chosen)"
    return (
        <>
            <div className="container mx-auto">
                <div className="flex">
                    <div className="flex-auto">
                        <div className="
                grid
                sm:grid-cols-1 md:grid-cols-2 
                    lg:grid-cols-3 xl:grid-cols-3
                mx-auto p-4
                gap-80
            ">
                            <HeadlessCard
                                header="Total projects count by"
                                body={
                                    <Table columns={[
                                        { label: totalProjectCategory, key: 'category' },
                                        { label: `Project count`, key: 'countProject' },
                                    ]}
                                        data={totalProject}
                                        errorMessage={"Something is wrong (invalid API)"} />
                                }

                                interact={
                                    <UserDefinedDropdown
                                        choice={[
                                            { label: 'None', value: "" },
                                            { label: 'Category', value: "Category" },
                                            { label: 'Continent', value: 'Continent' },
                                            { label: 'Country', value: 'Country' }]}

                                        handleFunction={fetchInputTotalProject}
                                    />}
                                width="w-80"

                                styleClass={styleClass}
                                titleClass={titleClass}


                            />

                            <HeadlessCard
                                header="Total donation count by "
                                body={
                                    <Table columns={[
                                        { label: totalDonationCategory, key: 'category' },
                                        { label: 'Donation count', key: 'countDonation' },
                                    ]}
                                        data={totalDonation}
                                        errorMessage={"Something is wrong (invalid API)"} />
                                }
                                interact={
                                    <UserDefinedDropdown
                                        choice={[,
                                            { label: 'None', value: "" },
                                            { label: 'Category', value: 'Category' },
                                            { label: 'Continent', value: 'Continent' },
                                            { label: 'Country', value: 'Country' }]}

                                        handleFunction={fetchInputTotalDonation}
                                    />}
                                width="w-80"

                                styleClass={styleClass}
                                titleClass={titleClass}
                            />



                        </div>

                        <div className="
                                grid
                                sm:grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 xl:grid-cols-3
                                mx-auto p-4
                                gap-80
                             ">
                            <HeadlessCard
                                header={"Total projects and donation count of a donor " + currentDonor}
                                interact={
                                    <Modal modalTitle={"Total projects and donation count of a donor"}
                                        modalButtonLabel={defaultButtonLabel}
                                        modalButtonClassName={defaultButtonClass}
                                        modalClassName={defaultModalClass}
                                        modalPanelClassName={defaultPanelClass}
                                        modalTitleClassName={defaultTitleClass}
                                        modalContent={
                                            <UserDefinedCombobox
                                                placeholder="Enter user's name here"
                                                data={totalDonors}
                                                dataKey='userId'
                                                containerClassName={"flex justify-center"}
                                                textField={item => typeof item === 'string' ? item : item.firstName + ' ' + item.lastName}
                                                handleFunction={fetchInputDonorStat}
                                            />}
                                    />}
                                body={


                                    <Table columns={[
                                        { label: 'Total Project', key: 'sumProject' },
                                        { label: 'Donation count', key: 'countDonation' },
                                        { label: 'Monthly donation', key: 'MonthlyDonated' }
                                    ]}
                                        data={donorStat}
                                        errorMessage={"No donor has been chosen, please do so"} />
                                }
                                width="w-80"
                                styleClass={styleClass}
                                titleClass={titleClass}

                            />

                            <HeadlessCard
                                header={"Total projects and donation count of a charity " +currentCharity}
                                interact={
                                    <Modal modalTitle="Total projects and donation count of a charity"
                                        modalButtonLabel={defaultButtonLabel}
                                        modalButtonClassName={defaultButtonClass}
                                        modalClassName={defaultModalClass}
                                        modalPanelClassName={defaultPanelClass}
                                        modalTitleClassName={defaultTitleClass}
                                        modalContent={
                                            <UserDefinedCombobox
                                                placeholder="Enter charity's name here"
                                                data={totalCharities}
                                                dataKey='userId'
                                                containerClassName={"flex justify-center"}
                                                textField={'name'}
                                                handleFunction={fetchInputCharityStat}
                                            />}
                                    />}
                                body={


                                    <Table columns={[
                                        { label: 'Total Project', key: 'sumProject' },
                                        { label: 'Donation raised', key: 'raisedDonation' },
                                    ]}
                                        data={charityStat}
                                        errorMessage={"No charity has been chosen, please do so"} />
                                }
                                width="w-80"
                                styleClass={styleClass}
                                titleClass={titleClass}

                            />


                        </div>

                        <div className="mt-8">
                            <HeadlessCard
                                header="Donation value and projects by "
                                interact={
                                    <>
                                        <Modal modalTitle="Category 1"
                                            modalButtonLabel={"Category 1"}
                                            modalButtonClassName={"text-white text-sm bg-red-700 rounded items-center justify-center px-4 w-au h-10"}
                                            modalClassName={defaultModalClass}
                                            modalPanelClassName={defaultPanelClass}
                                            modalTitleClassName={defaultTitleClass}
                                            modalContent={
                                                <UserDefinedCombobox
                                                    placeholder="Enter category 1 here"
                                                    data={totalCategories}
                                                    dataKey='name'
                                                    containerClassName={"flex justify-center"}
                                                    textField={'name'}
                                                    handleFunction={(value) => inputComparisonChange('category1', value)}
                                                />}
                                        />
                                        {" and "}
                                        <Modal modalTitle="Category 2"
                                            modalButtonLabel={"Category 2"}
                                            modalButtonClassName={"text-white text-sm bg-orange-700 rounded items-center justify-center px-4 w-au h-10"}
                                            modalClassName={defaultModalClass}
                                            modalPanelClassName={defaultPanelClass}
                                            modalTitleClassName={defaultTitleClass}
                                            modalContent={
                                                <UserDefinedCombobox
                                                    placeholder="Enter category 2 here"
                                                    data={totalCategories}
                                                    dataKey='name'
                                                    containerClassName={"flex justify-center"}
                                                    textField={'name'}
                                                    handleFunction={(value) => inputComparisonChange('category2', value)}
                                                />}
                                        />
                                        {"by"}
                                        <Modal modalTitle="Region"
                                            modalButtonLabel={"Region 1 "}
                                            modalButtonClassName={"text-white text-sm bg-orange-400 rounded items-center justify-center px-4 w-au h-10"}
                                            modalClassName={defaultModalClass}
                                            modalPanelClassName={defaultPanelClass}
                                            modalTitleClassName={defaultTitleClass}
                                            modalContent={
                                                <UserDefinedCombobox
                                                    placeholder="Enter continent 1 here"
                                                    data={totalRegion}
                                                    dataKey='name'
                                                    containerClassName={"flex justify-center"}
                                                    textField={'name'}
                                                    handleFunction={(value) => inputComparisonChange('region1', value)}
                                                />}
                                        />
                                        {"and"}
                                        <Modal modalTitle="Region"
                                            modalButtonLabel={"Region 2 "}
                                            modalButtonClassName={"text-white text-sm bg-orange-400 rounded items-center justify-center px-4 w-au h-10"}
                                            modalClassName={defaultModalClass}
                                            modalPanelClassName={defaultPanelClass}
                                            modalTitleClassName={defaultTitleClass}
                                            modalContent={
                                                <UserDefinedCombobox
                                                    placeholder="Enter continent 2 here"
                                                    data={totalRegion}
                                                    dataKey='name'
                                                    containerClassName={"flex justify-center"}
                                                    textField={'name'}
                                                    handleFunction={(value) => inputComparisonChange('region2', value)}
                                                />}
                                        />

                                        <Button onClick={(inputComparison) =>fetchComparisonInput(inputComparison)}
                                            label="Search"/>
                                    </>}
                                body={
                                    <HeadlessChart data={BarChartGenerator.dataGenerator(comparison)} options={BarChartGenerator.options(1)}>
                                          {({ chartData, chartOptions }) => chartData ? ( 
                                    <Bar datasetIdKey='id' data={chartData} options={chartOptions} /> ) : 
                                    ( <div>Please input options</div> )}
                                    </HeadlessChart>
                                }
                                width="w-11/12"
                                styleClass={styleClass}
                                titleClass={titleClass}
                            />
                        </div>

                    </div>

                    <div className="mt-4 
                    max-[769px]:translate-y-3/4 
                    min-[1440px]:-translate-x-12 
                    min-[1440px]:translate-y-4 ">

                        <HeadlessCard
                            header="Total donors registration by "
                            interact={<TimeInput modeArray={["Year", "Month", "Week"]} handleFunction={fetchInputDonorRegistration} />}
                            body={
                                <HeadlessChart data={ChartGenerator.dataGenerator(donorRegistration, "Donor registration")} options={ChartGenerator.options(2)}>
                                  {({ chartData, chartOptions }) => chartData ? ( 
                                    <Line datasetIdKey='id' data={chartData} options={chartOptions} /> ) : 
                                    ( <div>Please input an option</div> )}
                                </HeadlessChart>
                            }
                            width="w-80"
                            styleClass={styleClass}
                            titleClass={titleClass}

                        />

                        <HeadlessCard
                            header="Total number of active and completed projects"
                            interact={<TimeInput modeArray={["Year", "Month", "Week"]} handleFunction={fetchInputProjectStatus} />}
                            body={
                                <HeadlessChart data={PieChartGenerator.dataGenerator(totalProjectStatus)} options={PieChartGenerator.options(1)}>
                                   {({ chartData, chartOptions }) => chartData ? ( 
                                    <Pie datasetIdKey='id' data={chartData} options={chartOptions} /> ) : 
                                    ( <div>Please input an option</div> )}
                                </HeadlessChart>
                            }
                            width="w-80"
                            styleClass={styleClass}
                            titleClass={titleClass}

                            extraStyle={"translate-y-1/4"}
                        />


                    </div>


                </div>

            </div>






        </>
    );
};

export default Analytical;