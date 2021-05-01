-- CreateEnum
CREATE TYPE "CR_Type" AS ENUM ('DESIGN_ISSUE', 'NEW_FUNCTION', 'OTHER', 'STAGE_GATE', 'WP_ACTIVATION');

-- CreateEnum
CREATE TYPE "WBS_Element_Status" AS ENUM ('INACTIVE', 'ACTIVE', 'COMPLETE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'LEADERSHIP', 'PROJECT_MANAGER', 'PROJECT_LEAD', 'MEMBER', 'GUEST');

-- CreateEnum
CREATE TYPE "Scope_CR_Why_Type" AS ENUM ('ESTIMATION', 'SCHOOL', 'MANUFACTURING', 'RULES', 'OTHER_PROJECT', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "lastLogin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT E'GUEST',

    PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Change_Request" (
    "crId" SERIAL NOT NULL,
    "dateSubmitted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requestorId" INTEGER NOT NULL,
    "wbsElementId" INTEGER NOT NULL,
    "type" "CR_Type" NOT NULL,
    "dateReviewed" TIMESTAMP(3),
    "accepted" BOOLEAN,
    "reviewNotes" TEXT,
    "implemented" BOOLEAN,

    PRIMARY KEY ("crId")
);

-- CreateTable
CREATE TABLE "Scope_CR" (
    "scopeCrId" SERIAL NOT NULL,
    "changeRequestId" INTEGER NOT NULL,
    "what" TEXT NOT NULL,
    "scopeImpact" TEXT NOT NULL,
    "timelineImpact" INTEGER NOT NULL,
    "budgetImpact" INTEGER NOT NULL,

    PRIMARY KEY ("scopeCrId")
);

-- CreateTable
CREATE TABLE "Scope_CR_Why" (
    "scopeCrWhyId" SERIAL NOT NULL,
    "scopeCrId" INTEGER NOT NULL,
    "type" "Scope_CR_Why_Type" NOT NULL,
    "explain" TEXT NOT NULL,

    PRIMARY KEY ("scopeCrWhyId")
);

-- CreateTable
CREATE TABLE "Stage_Gate_CR" (
    "stageGateCrId" SERIAL NOT NULL,
    "changeRequestId" INTEGER NOT NULL,
    "leftoverBudget" INTEGER NOT NULL,
    "confirmDone" BOOLEAN NOT NULL,

    PRIMARY KEY ("stageGateCrId")
);

-- CreateTable
CREATE TABLE "Activation_CR" (
    "activationCrId" SERIAL NOT NULL,
    "changeRequestId" INTEGER NOT NULL,
    "projectLeadId" INTEGER NOT NULL,
    "projectManagerId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "confirmDetails" BOOLEAN NOT NULL,

    PRIMARY KEY ("activationCrId")
);

-- CreateTable
CREATE TABLE "Change" (
    "changeId" SERIAL NOT NULL,
    "dateImplemented" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changeRequestId" INTEGER NOT NULL,
    "implementorId" INTEGER NOT NULL,
    "wbsElementId" INTEGER NOT NULL,
    "detail" TEXT NOT NULL,

    PRIMARY KEY ("changeId")
);

-- CreateTable
CREATE TABLE "WBS_Element" (
    "wbsElementId" SERIAL NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "carNumber" INTEGER NOT NULL,
    "projectNumber" INTEGER NOT NULL,
    "workPackageNumber" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "status" "WBS_Element_Status" NOT NULL,
    "projectLeadId" INTEGER NOT NULL,
    "projectManagerId" INTEGER NOT NULL,

    PRIMARY KEY ("wbsElementId")
);

-- CreateTable
CREATE TABLE "Project" (
    "projectId" SERIAL NOT NULL,
    "wbsElementId" INTEGER NOT NULL,
    "googleDriveFolderLink" TEXT NOT NULL,
    "slideDeckLink" TEXT NOT NULL,
    "bomLink" TEXT NOT NULL,
    "taskListLink" TEXT NOT NULL,

    PRIMARY KEY ("projectId")
);

-- CreateTable
CREATE TABLE "Work_Package" (
    "workPackageId" SERIAL NOT NULL,
    "wbsElementId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "orderInProject" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "progress" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "budget" INTEGER NOT NULL,
    "dependencies" TEXT NOT NULL,
    "deliverables" TEXT NOT NULL,
    "rules" TEXT NOT NULL,

    PRIMARY KEY ("workPackageId")
);

-- CreateTable
CREATE TABLE "Description_Bullet" (
    "descriptionId" SERIAL NOT NULL,
    "workPackageId" INTEGER NOT NULL,
    "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateDeleted" TIMESTAMP(3),
    "detail" TEXT NOT NULL,

    PRIMARY KEY ("descriptionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.emailId_unique" ON "User"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "Scope_CR_changeRequestId_unique" ON "Scope_CR"("changeRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "Stage_Gate_CR_changeRequestId_unique" ON "Stage_Gate_CR"("changeRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "Activation_CR_changeRequestId_unique" ON "Activation_CR"("changeRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "wbsNumber" ON "WBS_Element"("carNumber", "projectNumber", "workPackageNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Project_wbsElementId_unique" ON "Project"("wbsElementId");

-- CreateIndex
CREATE UNIQUE INDEX "Work_Package_wbsElementId_unique" ON "Work_Package"("wbsElementId");

-- AddForeignKey
ALTER TABLE "Change_Request" ADD FOREIGN KEY ("requestorId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Change_Request" ADD FOREIGN KEY ("wbsElementId") REFERENCES "WBS_Element"("wbsElementId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scope_CR" ADD FOREIGN KEY ("changeRequestId") REFERENCES "Change_Request"("crId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scope_CR_Why" ADD FOREIGN KEY ("scopeCrId") REFERENCES "Scope_CR"("scopeCrId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stage_Gate_CR" ADD FOREIGN KEY ("changeRequestId") REFERENCES "Change_Request"("crId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activation_CR" ADD FOREIGN KEY ("changeRequestId") REFERENCES "Change_Request"("crId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activation_CR" ADD FOREIGN KEY ("projectLeadId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activation_CR" ADD FOREIGN KEY ("projectManagerId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Change" ADD FOREIGN KEY ("changeRequestId") REFERENCES "Change_Request"("crId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Change" ADD FOREIGN KEY ("implementorId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Change" ADD FOREIGN KEY ("wbsElementId") REFERENCES "WBS_Element"("wbsElementId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WBS_Element" ADD FOREIGN KEY ("projectLeadId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WBS_Element" ADD FOREIGN KEY ("projectManagerId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD FOREIGN KEY ("wbsElementId") REFERENCES "WBS_Element"("wbsElementId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work_Package" ADD FOREIGN KEY ("wbsElementId") REFERENCES "WBS_Element"("wbsElementId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work_Package" ADD FOREIGN KEY ("projectId") REFERENCES "Project"("projectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Description_Bullet" ADD FOREIGN KEY ("workPackageId") REFERENCES "Work_Package"("workPackageId") ON DELETE CASCADE ON UPDATE CASCADE;
