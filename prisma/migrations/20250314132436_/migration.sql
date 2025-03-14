-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('Video', 'Image');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Student', 'Teacher', 'Admin');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('button', 'checkbox', 'color', 'date', 'datetime_local', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week');

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('Activities', 'Modules', 'Quizzes');

-- CreateTable
CREATE TABLE "Media" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "duration" INTEGER,
    "body" TEXT,
    "type" "MediaType" NOT NULL,
    "activity" UUID,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "UserType" NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Activities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "duration" INTEGER,
    "deadline" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "module" TEXT,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGroups" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,

    CONSTRAINT "UserGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modules" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizSubmissions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "quizID" UUID NOT NULL,
    "completeDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizSubmissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizResponses" (
    "submissionID" UUID NOT NULL,
    "questionID" UUID NOT NULL,
    "type" "QuestionType" NOT NULL,
    "answerID" UUID,
    "answer" TEXT,

    CONSTRAINT "QuizResponses_pkey" PRIMARY KEY ("submissionID","questionID")
);

-- CreateTable
CREATE TABLE "QuizQuestionAnswers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "correct" BOOLEAN NOT NULL,
    "question" UUID,

    CONSTRAINT "QuizQuestionAnswers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizQuestionOrder" (
    "quizID" UUID NOT NULL,
    "questionID" UUID NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "QuizQuestionOrder_pkey" PRIMARY KEY ("quizID","questionID")
);

-- CreateTable
CREATE TABLE "QuizQuestions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "QuestionType" NOT NULL,
    "quiz" UUID,

    CONSTRAINT "QuizQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quizzes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(1000),
    "activity" UUID,

    CONSTRAINT "Quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardLocation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" "LocationType" NOT NULL,
    "boardId" UUID NOT NULL,
    "activitiesId" UUID,
    "modulesId" UUID,
    "quizzesId" UUID,

    CONSTRAINT "BoardLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Board" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "group" UUID,
    "defaultPrivate" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "boardID" UUID NOT NULL,
    "userEmail" TEXT NOT NULL,
    "postID" UUID,
    "private" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userEmail" TEXT NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ActivitiesToUserGroups" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_UserGroupsToUsers" (
    "A" UUID NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ModulesToUsers" (
    "A" UUID NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_QuizSubmissionsToUsers" (
    "A" UUID NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Media_url_key" ON "Media"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Modules_code_key" ON "Modules"("code");

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userEmail_key" ON "UserSettings"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivitiesToUserGroups_AB_unique" ON "_ActivitiesToUserGroups"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivitiesToUserGroups_B_index" ON "_ActivitiesToUserGroups"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserGroupsToUsers_AB_unique" ON "_UserGroupsToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_UserGroupsToUsers_B_index" ON "_UserGroupsToUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ModulesToUsers_AB_unique" ON "_ModulesToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_ModulesToUsers_B_index" ON "_ModulesToUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QuizSubmissionsToUsers_AB_unique" ON "_QuizSubmissionsToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_QuizSubmissionsToUsers_B_index" ON "_QuizSubmissionsToUsers"("B");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "activity_fk" FOREIGN KEY ("activity") REFERENCES "Activities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "fk_module" FOREIGN KEY ("module") REFERENCES "Modules"("code") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuizSubmissions" ADD CONSTRAINT "QuizSubmissions_quizID_fkey" FOREIGN KEY ("quizID") REFERENCES "Quizzes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResponses" ADD CONSTRAINT "QuizResponses_submissionID_fkey" FOREIGN KEY ("submissionID") REFERENCES "QuizSubmissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResponses" ADD CONSTRAINT "QuizResponses_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "QuizQuestions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResponses" ADD CONSTRAINT "QuizResponses_answerID_fkey" FOREIGN KEY ("answerID") REFERENCES "QuizQuestionAnswers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizQuestionAnswers" ADD CONSTRAINT "fk_question" FOREIGN KEY ("question") REFERENCES "QuizQuestions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuizQuestionOrder" ADD CONSTRAINT "QuizQuestionOrder_quizID_fkey" FOREIGN KEY ("quizID") REFERENCES "Quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizQuestionOrder" ADD CONSTRAINT "QuizQuestionOrder_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "QuizQuestions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizQuestions" ADD CONSTRAINT "fk_quiz" FOREIGN KEY ("quiz") REFERENCES "Quizzes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Quizzes" ADD CONSTRAINT "fk_activity" FOREIGN KEY ("activity") REFERENCES "Activities"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BoardLocation" ADD CONSTRAINT "BoardLocation_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardLocation" ADD CONSTRAINT "BoardLocation_activitiesId_fkey" FOREIGN KEY ("activitiesId") REFERENCES "Activities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardLocation" ADD CONSTRAINT "BoardLocation_modulesId_fkey" FOREIGN KEY ("modulesId") REFERENCES "Modules"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardLocation" ADD CONSTRAINT "BoardLocation_quizzesId_fkey" FOREIGN KEY ("quizzesId") REFERENCES "Quizzes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_group_fkey" FOREIGN KEY ("group") REFERENCES "UserGroups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_boardID_fkey" FOREIGN KEY ("boardID") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "Users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "Users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivitiesToUserGroups" ADD CONSTRAINT "_ActivitiesToUserGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "Activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivitiesToUserGroups" ADD CONSTRAINT "_ActivitiesToUserGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "UserGroups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGroupsToUsers" ADD CONSTRAINT "_UserGroupsToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "UserGroups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGroupsToUsers" ADD CONSTRAINT "_UserGroupsToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModulesToUsers" ADD CONSTRAINT "_ModulesToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModulesToUsers" ADD CONSTRAINT "_ModulesToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuizSubmissionsToUsers" ADD CONSTRAINT "_QuizSubmissionsToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "QuizSubmissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuizSubmissionsToUsers" ADD CONSTRAINT "_QuizSubmissionsToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("email") ON DELETE CASCADE ON UPDATE CASCADE;
