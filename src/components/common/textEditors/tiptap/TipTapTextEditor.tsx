"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import CharacterCount from "@tiptap/extension-character-count";

import {
    MdFormatBold,
    MdFormatItalic,
    MdFormatUnderlined,
    MdStrikethroughS,
    MdCode,
    MdOutlineHighlight,
} from "react-icons/md";
import {
    LuSubscript,
    LuSuperscript,
    LuHeading1,
    LuHeading2,
    LuHeading3,
    LuHeading4,
    LuList,
    LuListOrdered,
    LuQuote,
    LuCodeXml,
    LuMinus,
    LuLink,
    LuUnlink,
    LuAlignLeft,
    LuAlignCenter,
    LuAlignRight,
    LuAlignJustify,
    LuUndo2,
    LuRedo2,
} from "react-icons/lu";

import ToolbarButton from "./ToolbarButton";

interface Props {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    maxCharacters?: number;
    showCharacterCount?: boolean;
};

const TipTapTextEditor = (props: Props) => {
    const { value = "",
        onChange,
        placeholder = "Write something...",
        disabled = false,
        maxCharacters,
        showCharacterCount = true
    } = props;

    const editor = useEditor({
        immediatelyRender: false,

        extensions: [
            StarterKit,
            Underline,

            Link.configure({
                openOnClick: false,
                autolink: true,
                HTMLAttributes: {
                    class: "editor-link",
                    rel: "noopener noreferrer",
                    target: "_blank",
                },
            }),

            Placeholder.configure({
                placeholder,
            }),

            TextAlign.configure({
                types: ["heading", "paragraph"],
                alignments: ["left", "center", "right", "justify"],
            }),

            Highlight,

            Subscript,
            Superscript,

            CharacterCount.configure({
                ...(maxCharacters ? { limit: maxCharacters } : {}),
            }),
        ],

        content: value,
        editable: !disabled,

        editorProps: {
            attributes: {
                class: "tiptap",
                spellcheck: "true",
            },
        },

        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
    });

    // Sync external value
    useEffect(() => {
        if (!editor) return;

        if (value !== editor.getHTML()) {
            editor.commands.setContent(value || "", {
                emitUpdate: false,
            });
        }
    }, [editor, value]);

    // Sync disabled state
    useEffect(() => {
        editor?.setEditable(!disabled);
    }, [editor, disabled]);

    if (!editor) return null;

    const run = (callback: () => void) => {
        callback();
    };

    const addLink = () => {
        const previousUrl = editor.getAttributes("link").href;

        const url = window.prompt(
            "Enter URL",
            previousUrl || "https://"
        );

        if (url === null) return;

        const trimmedUrl = url.trim();

        if (!trimmedUrl) {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        const normalizedUrl = /^https?:\/\//i.test(trimmedUrl)
            ? trimmedUrl
            : `https://${trimmedUrl}`;

        editor.chain().focus().extendMarkRange("link").setLink({
            href: normalizedUrl,
        }).run();
    };

    const headingLevel = [1, 2, 3, 4].find((level) =>
        editor.isActive("heading", { level })
    );

    const characters = editor.storage.characterCount.characters();
    const words = editor.storage.characterCount.words();

    return (
        <div
            className={`
                overflow-hidden rounded-lg border border-border-primary
                bg-bg-primary transition-colors
                focus-within:border-primary
                ${disabled ? "opacity-60" : ""}
            `}
        >
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 border-b border-border-primary px-3 py-2">

                {/* Text formatting */}
                <div className="flex items-center gap-0.5">
                    <ToolbarButton
                        label="Bold"
                        icon={<MdFormatBold size={17} />}
                        active={editor.isActive("bold")}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                    />

                    <ToolbarButton
                        label="Italic"
                        icon={<MdFormatItalic size={17} />}
                        active={editor.isActive("italic")}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                    />

                    <ToolbarButton
                        label="Underline"
                        icon={<MdFormatUnderlined size={17} />}
                        active={editor.isActive("underline")}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                    />

                    <ToolbarButton
                        label="Strikethrough"
                        icon={<MdStrikethroughS size={17} />}
                        active={editor.isActive("strike")}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                    />

                    <ToolbarButton
                        label="Inline code"
                        icon={<MdCode size={17} />}
                        active={editor.isActive("code")}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().toggleCode().run()}
                    />

                    <ToolbarButton
                        label="Highlight"
                        icon={<MdOutlineHighlight size={17} />}
                        active={editor.isActive("highlight")}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                    />
                </div>

                <div className="w-px h-5 bg-border-primary mx-1" />

                {/* Headings */}
                <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4].map((level) => {
                        const HeadingIcon = [
                            LuHeading1,
                            LuHeading2,
                            LuHeading3,
                            LuHeading4,
                        ][level - 1];

                        return (
                            <ToolbarButton
                                key={level}
                                label={`Heading ${level}`}
                                icon={<HeadingIcon size={18} />}
                                active={headingLevel === level}
                                disabled={disabled}
                                onClick={() =>
                                    editor.chain().focus().toggleHeading({
                                        level: level as 1 | 2 | 3 | 4,
                                    }).run()
                                }
                            />
                        );
                    })}
                </div>

                <div className="w-px h-5 bg-border-primary mx-1" />

                {/* Lists */}
                <div className="flex items-center gap-0.5">
                    <ToolbarButton
                        label="Bullet list"
                        icon={<LuList size={18} />}
                        active={editor.isActive("bulletList")}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                    />

                    <ToolbarButton
                        label="Numbered list"
                        icon={<LuListOrdered size={18} />}
                        active={editor.isActive("orderedList")}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    />
                </div>

                <div className="w-px h-5 bg-border-primary mx-1" />

                {/* Text alignment */}
                <div className="flex items-center gap-0.5">
                    <ToolbarButton
                        label="Align left"
                        icon={<LuAlignLeft size={17} />}
                        active={editor.isActive({ textAlign: "left" })}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    />

                    <ToolbarButton
                        label="Align center"
                        icon={<LuAlignCenter size={17} />}
                        active={editor.isActive({ textAlign: "center" })}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    />

                    <ToolbarButton
                        label="Align right"
                        icon={<LuAlignRight size={17} />}
                        active={editor.isActive({ textAlign: "right" })}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    />

                    <ToolbarButton
                        label="Justify"
                        icon={<LuAlignJustify size={17} />}
                        active={editor.isActive({ textAlign: "justify" })}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                    />
                </div>

                <div className="w-px h-5 bg-border-primary mx-1" />

                {/* More formatting */}
                <div className="flex items-center gap-0.5">
                    <ToolbarButton
                        label="Blockquote"
                        icon={<LuQuote size={17} />}
                        active={editor.isActive("blockquote")}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    />

                    <ToolbarButton
                        label="Code block"
                        icon={<LuCodeXml size={18} />}
                        active={editor.isActive("codeBlock")}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    />

                    <ToolbarButton
                        label="Horizontal divider"
                        icon={<LuMinus size={18} />}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    />

                    <ToolbarButton
                        label="Subscript"
                        icon={<LuSubscript size={17} />}
                        active={editor.isActive("subscript")}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().toggleSubscript().run()}
                    />

                    <ToolbarButton
                        label="Superscript"
                        icon={<LuSuperscript size={17} />}
                        active={editor.isActive("superscript")}
                        disabled={disabled}
                        onClick={() => editor.chain().focus().toggleSuperscript().run()}
                    />

                    <ToolbarButton
                        label="Add link"
                        icon={<LuLink size={17} />}
                        active={editor.isActive("link")}
                        disabled={disabled}
                        onClick={addLink}
                    />

                    <ToolbarButton
                        label="Remove link"
                        icon={<LuUnlink size={17} />}
                        disabled={disabled || !editor.isActive("link")}
                        onClick={() =>
                            editor.chain().focus().extendMarkRange("link").unsetLink().run()
                        }
                    />
                </div>

                <div className="flex-1 min-w-2" />

                {/* History */}
                <div className="flex items-center gap-0.5">
                    <ToolbarButton
                        label="Undo"
                        icon={<LuUndo2 size={18} />}
                        disabled={disabled || !editor.can().undo()}
                        onClick={() => editor.chain().focus().undo().run()}
                    />

                    <ToolbarButton
                        label="Redo"
                        icon={<LuRedo2 size={18} />}
                        disabled={disabled || !editor.can().redo()}
                        onClick={() => editor.chain().focus().redo().run()}
                    />
                </div>
            </div>

            {/* Editor area */}
            <EditorContent editor={editor} />

            {/* Footer */}
            {showCharacterCount && (
                <div className="flex items-center justify-end gap-3 border-t border-border-primary px-4 py-2">
                    <span className="text-xs text-text-tertiary">
                        {words} {words === 1 ? "word" : "words"}
                    </span>

                    <span className="text-xs text-text-tertiary">
                        {characters}
                        {maxCharacters ? ` / ${maxCharacters}` : ""} characters
                    </span>
                </div>
            )}
        </div>
    );
};

export default TipTapTextEditor;