import { Avatar, Flex, FlexProps, Input, Modal } from "antd";
import { Grant } from "../../../../types/grants";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";

import classes from "./Header.module.css";
import { useState } from "react";
import {
    useGrantsMatchesQuery,
    useHideGrantMutation,
    useSaveGrantMutation,
    useSavedGrantsQuery,
} from "../../../../api/grants";

type FeedbackModalProps = {
    isOpen: boolean;
    onCancel: () => void;
    onOk: (feedback: string) => void;
};

const IconContainer = ({
    children,
    ...props
}: React.PropsWithChildren<FlexProps>) => {
    return (
        <Flex
            justify="center"
            align="center"
            className={classes.iconContainer}
            {...props}
        >
            {children}
        </Flex>
    );
};

const FeedbackModal = ({ isOpen, onCancel, onOk }: FeedbackModalProps) => {
    const [feedback, setFeedback] = useState<string>("");

    const handleFeedbackChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFeedback(event.target.value);
    };

    const handleSubmitFeedback = () => {
        onOk(feedback);
    };

    return (
        <Modal
            title="Feedback"
            open={isOpen}
            onOk={handleSubmitFeedback}
            onCancel={onCancel}
        >
            <Input.TextArea
                value={feedback}
                onChange={handleFeedbackChange}
                placeholder="Input feedback here..."
                autoSize={{ minRows: 2, maxRows: 6 }}
            />
        </Modal>
    );
};

export const Header = ({ grant }: { grant: Grant }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFeedbackPositive, setIsFeedbackPositive] = useState(false);
    const { refetch: refetchGrantMatches } = useGrantsMatchesQuery();
    const { refetch: refetchSavedGrants } = useSavedGrantsQuery();

    const [handleSaveGrant] = useSaveGrantMutation();
    const [handleHideGrant] = useHideGrantMutation();

    const handleLikeClick = () => {
        setIsModalOpen(true);
        setIsFeedbackPositive(true);
    };

    const handleDislikeClick = () => {
        setIsModalOpen(true);
        setIsFeedbackPositive(false);
    };

    const handleSubmitFeedback = (feedback: string) => {
        setIsModalOpen(false);
        if (isFeedbackPositive) {
            handleSaveGrant({
                variables: { grantId: grant._id, feedback },
            })
                .then(refetchGrantMatches)
                .then(refetchSavedGrants);
        } else {
            handleHideGrant({
                variables: { grantId: grant._id, feedback },
            })
                .then(refetchGrantMatches)
                .then(refetchSavedGrants);
        }
    };

    const handleRejectFeedback = () => {
        setIsModalOpen(false);
    };

    return (
        <Flex justify="space-between" align="center">
            <Avatar size={40}>{grant.name[0]}</Avatar>

            <Flex className={classes.iconsContainer}>
                <IconContainer onClick={handleLikeClick}>
                    <LikeOutlined />
                </IconContainer>

                <IconContainer onClick={handleDislikeClick}>
                    <DislikeOutlined />
                </IconContainer>
            </Flex>
            <FeedbackModal
                onCancel={handleRejectFeedback}
                onOk={handleSubmitFeedback}
                isOpen={isModalOpen}
            />
        </Flex>
    );
};
