'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageExtension from '@tiptap/extension-image'
import LinkExtension from '@tiptap/extension-link'
import PlaceholderExtension from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { useRef, useState, useCallback } from 'react'
import { uploadImage } from '../lib/uploadImage'

interface TiptapProps {
    content?: string;
    onChange?: (html: string) => void;
    placeholder?: string;
}

const ToolbarBtn = ({ onClick, active = false, disabled = false, title, children }: {
    onClick: () => void; active?: boolean; disabled?: boolean; title: string; children: React.ReactNode;
}) => (
    <button type="button" onClick={onClick} disabled={disabled} title={title}
        className={`px-2.5 py-1.5 rounded-lg text-sm font-bold transition-all ${active ? 'bg-brand-teal text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'} disabled:opacity-30 disabled:cursor-not-allowed`}>
        {children}
    </button>
);

const Sep = () => <div className="w-px h-5 bg-gray-300 mx-1 self-center" />;

export default function Tiptap({ content = '', onChange, placeholder = 'Start writing your blog post...' }: TiptapProps) {
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [showLink, setShowLink] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            ImageExtension.configure({
                inline: false,
                allowBase64: false,
                HTMLAttributes: { class: 'max-w-full rounded-xl my-6 mx-auto block shadow-md' }
            }),
            LinkExtension.configure({
                openOnClick: false,
                HTMLAttributes: { class: 'text-brand-teal underline', target: '_blank', rel: 'noopener noreferrer' }
            }),
            PlaceholderExtension.configure({ placeholder }),
        ],
        content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => { onChange?.(editor.getHTML()); },
    });

    const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !editor) return;
        setIsUploading(true);
        const { url, error } = await uploadImage(file);
        if (url && !error) {
            editor.chain().focus().setImage({ src: url, alt: file.name }).run();
        }
        setIsUploading(false);
        e.target.value = '';
    }, [editor]);

    const applyLink = useCallback(() => {
        if (!editor) return;
        if (linkUrl === '') editor.chain().focus().unsetLink().run();
        else editor.chain().focus().setLink({ href: linkUrl }).run();
        setShowLink(false);
        setLinkUrl('');
    }, [editor, linkUrl]);

    if (!editor) return null;

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:border-brand-teal transition-colors">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex flex-wrap items-center gap-0.5">
                <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">H2</ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">H3</ToolbarBtn>
                <Sep />
                <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold"><strong>B</strong></ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic"><em>I</em></ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline"><span className="underline">U</span></ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough"><span className="line-through">S</span></ToolbarBtn>
                <Sep />
                <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">• List</ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered List">1. List</ToolbarBtn>
                <Sep />
                <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">❝</ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Code">{'</>'}</ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} title="Divider">─</ToolbarBtn>
                <Sep />
                <ToolbarBtn onClick={() => setShowLink(!showLink)} active={editor.isActive('link') || showLink} title="Insert Link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                </ToolbarBtn>
                <ToolbarBtn onClick={() => imageInputRef.current?.click()} disabled={isUploading} active={false} title="Insert Image">
                    {isUploading
                        ? <span className="text-xs">↑…</span>
                        : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    }
                </ToolbarBtn>
                <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                <Sep />
                <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} active={false} title="Undo">↩</ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} active={false} title="Redo">↪</ToolbarBtn>
            </div>

            {/* Link Input */}
            {showLink && (
                <div className="bg-teal-50 border-b border-gray-200 px-4 py-2.5 flex gap-2 items-center">
                    <input type="url" value={linkUrl} onChange={e => setLinkUrl(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && applyLink()}
                        placeholder="https://example.com"
                        className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-brand-teal" />
                    <button type="button" onClick={applyLink} className="bg-brand-teal text-white px-4 py-1.5 rounded-lg text-sm font-bold">Apply</button>
                    <button type="button" onClick={() => setShowLink(false)} className="text-gray-400 hover:text-gray-600 px-2">✕</button>
                </div>
            )}

            {/* Editor Content */}
            <EditorContent editor={editor}
                className="prose max-w-none min-h-[400px] px-6 py-4 [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[400px] [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-gray-400 [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none"
            />
        </div>
    );
}