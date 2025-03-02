import TableList from '@/components/TableList';
import columnDefs from '@/utils/ag-grid/user';

const mockUsers = [
    { emailAddress: 'Jordane.Bednar@gmail.com', firstName: 'Santina', lastName: 'Kovacek', isActive: true },
    { emailAddress: 'Eve.Stoltenberg21@gmail.com', firstName: 'Elwin', lastName: 'Sanford', isActive: true },
    { emailAddress: 'Morton_Haag@yahoo.com', firstName: 'Elbert', lastName: 'Little', isActive: false },
    { emailAddress: 'Sheridan.Hegmann@gmail.com', firstName: 'Susanna', lastName: 'Koch', isActive: true },
    { emailAddress: 'Korbin48@hotmail.com', firstName: 'Roberto', lastName: 'Hirthe', isActive: false },
    { emailAddress: 'Imani.Rolfson0@gmail.com', firstName: 'Mafalda', lastName: 'Feeney', isActive: true },
    { emailAddress: 'Jordy24@hotmail.com', firstName: 'Kyla', lastName: 'McCullough', isActive: true },
    { emailAddress: 'Brooke_Hansen@gmail.com', firstName: 'Kaia', lastName: 'Stokes', isActive: false },
    { emailAddress: 'Jennie_Purdy@yahoo.com', firstName: 'Elinor', lastName: 'Bergnaum', isActive: true },
    { emailAddress: 'Clay31@yahoo.com', firstName: 'Sherwood', lastName: 'Howe', isActive: true },
    { emailAddress: 'Forest_Wolf37@gmail.com', firstName: 'Reba', lastName: 'Gusikowski', isActive: false },
    { emailAddress: 'Javkayla.Orn@yahoo.com', firstName: 'Will', lastName: 'Cummerata', isActive: true },
    { emailAddress: 'Minerva54@yahoo.com', firstName: 'Ried', lastName: 'Wolber', isActive: true },
];

const UserList = () => {
    return (
        <TableList columnDefs={columnDefs} data={mockUsers} itemName='user' onDelete={() => console.log('Delete')} />
    );
};

export default UserList;
