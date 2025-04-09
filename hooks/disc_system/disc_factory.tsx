/**
 *
 */
import DiscFor from '@/components/disc_system/DiscFor';
import Magazine from '@/components/disc_system/Magazine';

import Bottle from '@/components/disc_system/atoms/Bottle';

import DiscForDcoml from '@/components/disc_system/DiscForDcoml';
import Ms from '@/components/atoms/Ms';
import Matrix from '@/components/rz_uml/atoms/Matrix';
import Cluster from '@/components/rz_uml/atoms/Cluster';
import Hand from '@/components/disc_system/atoms/Hand'
import FullDisc from '@/components/disc_system/atoms/FullDisc';

const useDiscFactory = (lop: { [key: string]: any }) => {
  const createDisc = (disc, ref=undefined) => {
    let reply;
    switch (disc.type) {
      case 'DiscForDcoml':
        reply = (
          <DiscForDcoml
            identifier={disc.identifier}
            height={disc.height}
            width={disc.width}
            left={disc.left}
            top={disc.top}
            dcoml={disc.dcoml}
          />
        );
        break;
      case 'DiscForReadyMade':
        let doms = [];
        
        if (disc.subType === 'Ms') {
          doms.push(<Ms {...disc.ms} />);
        } else if (disc.subType === 'Matrix') {
          doms.push(<Matrix {...disc.matrix} />);
        } else if (disc.subType === 'Cluster') {
          doms.push(<Cluster {...disc.cluster} />);
        } else if (disc.subType === 'Bottle') {
          doms.push(<Bottle {...disc.bottle}/>);
        }

        reply = (
          <DiscFor
            {
             ...disc
/*             
            identifier={disc.identifier}
            contentsForFrontInner={disc.contentsForFrontInner}
            contentsForBottomInner={disc.contentsForBottomInner}
            title={disc.title}
            height={disc.height}
            width={disc.width}
            left={disc.left}
            top={disc.top}
            isReact={false}
            doIt={disc.doIt}
            isBottomOnly={disc.isBottomOnly}
            z={disc.z}
            rotateY={disc.rotateY}
            duration={disc.duration}
            views={disc.views}
*/             
            }
          >
            {doms||props.children}
          </DiscFor>
        );
        break;
      case 'Magazine':
        reply = (
          <Magazine
            ref={ref}
            identifier={disc.identifier}
            contentsForFrontInner={disc.contentsForFrontInner}
            contentsForBottomInner={disc.contentsForBottomInner}
            contentsForBottomOuter={disc.contentsForBottomOuter}
            top={disc.top}
            left={disc.left}
            height={disc.height}
            width={disc.width}
            views={disc.views}
            discs={disc.discs}
            transformForTheJoint={disc.transformForTheJoint}
          />
        );
        break;
      case 'Hand':
        reply = (
          <Hand
            ref={ref}
            indentifier={disc.identifier}
            contentsForFrontOuter={disc.contentsForFrontOuter}
            contentsForBottomInner={disc.contentsForBottomInner}
            height={disc.height}
            width={disc.width}
            left={disc.left}
            top={disc.top}
          />
        );
        break;
      case 'FullDisc':
        reply = (
          <FullDisc
            ref={ref}
            {...disc}
          />
        );
        break;
    }
    return reply;
  };

  return {
    createDisc,
  };
};

export default useDiscFactory;
