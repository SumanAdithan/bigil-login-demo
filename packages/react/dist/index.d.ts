import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
import { ClassValue } from 'clsx';

declare const buttonVariants: (props?: ({
    variant?: "primary" | "primaryDestructive" | "secondary" | "secondaryGray" | "secondaryDestructive" | "tertiary" | "tertiaryGray" | "tertiaryDestructive" | "link" | "linkGray" | "linkDestructive" | "skeleton" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | null | undefined;
    fullWidth?: boolean | null | undefined;
    loading?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

declare const tileVariants: (props?: ({
    selected?: boolean | null | undefined;
    disabled?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface TileProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'value'>, VariantProps<typeof tileVariants> {
    asChild?: boolean;
    value?: string;
    disabled?: boolean;
}
declare const Tile: React.ForwardRefExoticComponent<TileProps & React.RefAttributes<HTMLButtonElement>>;

interface TileGroupContextValue {
    value?: string;
    onValueChange?: (value: string) => void;
}
declare const useTileGroup: () => TileGroupContextValue | null;
interface TileGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: string;
    onValueChange?: (value: string) => void;
    defaultValue?: string;
}
declare const TileGroup: React.ForwardRefExoticComponent<TileGroupProps & React.RefAttributes<HTMLDivElement>>;

declare const cardVariants: (props?: ({
    variant?: "horizontal" | "vertical" | null | undefined;
    selected?: boolean | null | undefined;
    disabled?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
    asChild?: boolean;
}
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;

interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const CardMedia: React.ForwardRefExoticComponent<CardMediaProps & React.RefAttributes<HTMLDivElement>>;

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const CardContent: React.ForwardRefExoticComponent<CardContentProps & React.RefAttributes<HTMLDivElement>>;

declare const segmentedControlVariants: (props?: ({
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SegmentedControlContextValue {
    value?: string;
    onValueChange?: (value: string) => void;
}
declare const SegmentedControlContext: React.Context<SegmentedControlContextValue>;
interface SegmentedControlProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof segmentedControlVariants> {
    value?: string;
    onValueChange?: (value: string) => void;
}
declare const SegmentedControl: React.ForwardRefExoticComponent<SegmentedControlProps & React.RefAttributes<HTMLDivElement>>;

interface SegmentedControlItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
    asChild?: boolean;
}
declare const SegmentedControlItem: React.ForwardRefExoticComponent<SegmentedControlItemProps & React.RefAttributes<HTMLButtonElement>>;

interface FormFieldContextValue {
    id: string;
    isError?: boolean;
    isDisabled?: boolean;
}
declare const FormFieldContext: React.Context<FormFieldContextValue | null>;
declare function useFormField(): FormFieldContextValue;
interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
    isError?: boolean;
    isDisabled?: boolean;
}
declare const FormField: React.ForwardRefExoticComponent<FormFieldProps & React.RefAttributes<HTMLDivElement>>;

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
}
declare const FormLabel: React.ForwardRefExoticComponent<FormLabelProps & React.RefAttributes<HTMLLabelElement>>;

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}
declare const FormInput: React.ForwardRefExoticComponent<FormInputProps & React.RefAttributes<HTMLInputElement>>;

interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
}
declare const FormMessage: React.ForwardRefExoticComponent<FormMessageProps & React.RefAttributes<HTMLParagraphElement>>;

interface OtpInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    errorMessage?: string;
    hint?: string;
    onResend?: () => void;
    resendLabel?: string;
    maxLength?: number;
    disabled?: boolean;
}
/**
 * OtpInput - A high-fidelity React wrapper for the Atlas JS OTP implementation.
 */
declare const OtpInput: React.ForwardRefExoticComponent<OtpInputProps & React.RefAttributes<HTMLDivElement>>;

interface ModalProps {
    children?: React.ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    container?: HTMLElement;
}
/**
 * Modal Component (Wrapper)
 *
 * High-fidelity React wrapper around the Atlas Vanilla JS Modal logic.
 * Ensures consistent behavior (Esc key, backdrop interaction) across frameworks.
 */
declare function Modal({ children, isOpen, onClose, container }: ModalProps): React.ReactPortal | null;
interface ModalOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
}
/**
 * ModalOverlay is part of the backdrop. Clicking it should trigger onClose.
 * (Native JS class handles this by checking event.target === backdrop)
 */
declare const ModalOverlay: React.ForwardRefExoticComponent<ModalOverlayProps & React.RefAttributes<HTMLDivElement>>;
interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg';
}
declare const ModalContent: React.ForwardRefExoticComponent<ModalContentProps & React.RefAttributes<HTMLDivElement>>;
interface ModalHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
    title?: React.ReactNode;
    description?: React.ReactNode;
    isCentered?: boolean;
    icon?: React.ReactNode;
    showCloseButton?: boolean;
    hideBorder?: boolean;
}
declare const ModalHeader: React.ForwardRefExoticComponent<ModalHeaderProps & React.RefAttributes<HTMLElement>>;
interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const ModalBody: React.ForwardRefExoticComponent<ModalBodyProps & React.RefAttributes<HTMLDivElement>>;
interface ModalFooterProps extends React.HTMLAttributes<HTMLElement> {
}
declare const ModalFooter: React.ForwardRefExoticComponent<ModalFooterProps & React.RefAttributes<HTMLElement>>;

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    helperText?: string;
    error?: boolean | string;
    textareaClassName?: string;
}
declare const TextArea: React.ForwardRefExoticComponent<TextAreaProps & React.RefAttributes<HTMLTextAreaElement>>;

interface PaginationDotsProps {
    total: number;
    activeIndex: number;
    onDotClick?: (index: number) => void;
    className?: string;
    dotClassName?: string;
}
/**
 * PaginationDots component for indicating carousel or multi-step progress.
 * Uses button elements for improved accessibility and interactive support.
 */
declare const PaginationDots: React.FC<PaginationDotsProps>;

declare function cn(...inputs: ClassValue[]): string;

export { Button, type ButtonProps, Card, CardContent, type CardContentProps, CardMedia, type CardMediaProps, type CardProps, FormField, FormFieldContext, type FormFieldProps, FormInput, type FormInputProps, FormLabel, type FormLabelProps, FormMessage, type FormMessageProps, Modal, ModalBody, type ModalBodyProps, ModalContent, type ModalContentProps, ModalFooter, type ModalFooterProps, ModalHeader, type ModalHeaderProps, ModalOverlay, type ModalOverlayProps, type ModalProps, OtpInput, type OtpInputProps, PaginationDots, type PaginationDotsProps, SegmentedControl, SegmentedControlContext, SegmentedControlItem, type SegmentedControlItemProps, type SegmentedControlProps, TextArea, type TextAreaProps, Tile, TileGroup, type TileGroupProps, type TileProps, buttonVariants, cardVariants, cn, tileVariants, useFormField, useTileGroup };
