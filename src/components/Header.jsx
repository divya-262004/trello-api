import {Flex} from 'antd';
import trelloLogo from '../assets/trello-original-logo.svg';

const Header = () => {
  return (
    <Flex className="bg-blue-600 w-full h-16" gap="medium" align="center" >

      <img src={trelloLogo}
        alt="Trello-logo"
        className="w-8 h-8" />
      <span className="text-white font-bold italic">Trello</span>
    </Flex>


  );
};

export default Header;
