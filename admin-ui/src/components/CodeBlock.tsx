import { Badge, Box, Button } from '@radix-ui/themes';
import React, { useState } from 'react';

interface CodeBlockProps {
    /**
     * The content to display in the code block.
     */
    content: string;
    /**
     * Enable display of copy button to allow user to copy text content.
     */
    isCopyEnabled?: boolean;
    /**
     * Determine whether content is HTML.
     */
    isHtml?: boolean;
}

const copyButtonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    color: '#fff',
    fontSize: '0.75rem',
    position: 'absolute',
    top: '1rem',
    right: '1rem',
};

const containerStyle: React.CSSProperties = {
    backgroundColor: 'rgba(170,85,0,0.09)',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    padding: '1.25rem',
    paddingRight: '4rem',
    fontFamily: 'monospace',
    height: 'auto',
    maxHeight: '300px',
    overflowY: 'auto',
    margin: 0,
    position: 'relative',
};

const preWrapStyle: React.CSSProperties = {
    margin: 0,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
    overflowWrap: 'anywhere',
    fontSize: '0.9rem',
    lineHeight: '1.4',
    padding: '0.5rem 1rem',
};

export const CodeBlock: React.FC<CodeBlockProps> = ({ content, isCopyEnabled = true, isHtml = false }) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).catch(console.error);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000);
    };

    return (
        <Box className='h-full relative' as='div'>
            <Box style={containerStyle}>
                {isCopyEnabled && (
                    <Button
                        data-testid='copy-button'
                        color='gold'
                        size='2'
                        onClick={() => copyToClipboard(content)}
                        style={copyButtonStyle}
                    >
                        {isCopied ? 'Copied!' : 'Copy'}
                    </Button>
                )}
                {isHtml ? (
                    <Box as='div' style={preWrapStyle} dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                    <Box as='div' style={preWrapStyle}>
                        <Badge color='gray' size='3' className='absolute top-0 right-0 mt-3 -z-10 mr-3'>
                            Raw
                        </Badge>
                        <pre>{content}</pre>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default CodeBlock;
