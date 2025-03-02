import { Badge } from '@radix-ui/themes';

const StatusPill = ({ value }: { value: boolean }) => {
    const color = value ? 'green' : 'red';
    const text = value ? 'Active' : 'Inactive';

    return (
        <Badge color={color} style={{ padding: '0.25rem 0.5rem', borderRadius: '9999px' }}>
            {text}
        </Badge>
    );
};

export default StatusPill;
