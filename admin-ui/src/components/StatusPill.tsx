import { Badge } from '@radix-ui/themes';
import { badgePropDefs } from '@radix-ui/themes/props';

type StatusPillProps = {
    variant: 'active' | 'inactive';
    text: string;
};

const StatusPill = ({ variant, text }: StatusPillProps) => {
    let baseStytle = { padding: '0.25rem 0.5rem', borderRadius: '9999px' };
    let color: typeof badgePropDefs.color.default = 'gray';

    switch (variant) {
        case 'active':
            color = 'green';
            break;
        case 'inactive':
            color = 'red';
            break;
    }

    return (
        <Badge color={color} style={baseStytle}>
            {text}
        </Badge>
    );
};

export default StatusPill;
