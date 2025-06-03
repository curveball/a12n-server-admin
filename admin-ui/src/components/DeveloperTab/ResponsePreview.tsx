import { Box } from '@radix-ui/themes';
import { CodeBlock } from '../CodeBlock';

interface ResponsePreviewProps<T> {
    isLoading: boolean;
    error: Error | null;
    data: T;
}

export const ResponsePreview = <T,>({ isLoading, error, data }: ResponsePreviewProps<T>) => {
    const content = isLoading
        ? 'Loading...'
        : error
          ? error.message
          : data && typeof data === 'object'
            ? JSON.stringify(data, null, 2)
            : 'No data';

    return (
        <Box>
            <CodeBlock content={content} isCopyEnabled={false} />
        </Box>
    );
};
