/**
 *
 */
import Sail from '@/components/disc_system/Sail';
import Disc from '@/components/disc_system/Disc';
import DiscFor from '@/components/disc_system/DiscFor';
import Magazine from '@/components/disc_system/Magazine';
import PastOrFuture from '@/components/disc_system/PastOrFuture';

import Bottle from '@/components/disc_system/atoms/Bottle';

import DiscForDcoml from '@/components/disc_system/DiscForDcoml';
import Ms from '@/components/atoms/Ms';
import Matrix from '@/components/rz_uml/atoms/Matrix';
import Cluster from '@/components/rz_uml/atoms/Cluster';
import Hand from '@/components/disc_system/atoms/Hand'
import MetalTape from '@/components/disc_system/MetalTape';
import FullDisc from '@/components/disc_system/atoms/FullDisc';
import Cable from '@/components/disc_system/Cable';
import DiscForDcosml from '@/components/disc_system/DiscForDcosml';
import Foundation from '@/components/disc_system/atoms/Foundation';
import Cube from '@/components/disc_system/Cube';
import Reel from '@/components/disc_system/atoms/Reel';

import Tank from '@/components/disc_system/molecules/Tank';

const useDiscFactory = (lop: { [key: string]: any }) => {
  const isReact = (disc) => {
    return (disc?.isReact) ? disc.isReact : false;
  };

  const createDisc = (disc, ref=undefined) => {
    let reply;
    switch (disc.type) {
      case 'Sail':
        reply = (
          <Sail
            key={disc.identifier}
            identifier={disc.identifier}
            contents={disc.contents}
            contentsForFrontInner={disc.contentsForFrontInner}
            title={disc.title}
            top={disc.top}
            left={disc.left}
            height={disc.height}
            width={disc.width}
            z={disc.z}
            transform={disc.transform}
            duration={disc.duration}
            
//            isFromNow={isFromNow}
          />
        );
        break;
      case 'Disc':
        reply = (
          <Disc
            {...disc}
            key={disc.identifier}
          />
        );
        break;
      case 'DiscForDcoml':
        reply = (
          <DiscForDcoml
            {...disc}
          />
        );
        break;
      case 'DiscForReadyMade':
        let doms = [];
        
        if (disc.subType === 'Ms') {
          doms.push(<Ms { ...disc.ms } />);
        } else if (disc.subType === 'Matrix') {
          doms.push(<Matrix { ...disc.matrix } />);
        } else if (disc.subType === 'Cluster') {
          doms.push(<Cluster { ...disc.cluster } />);
        } else if (disc.subType === 'Bottle') {
          doms.push(<Bottle { ...disc.bottle } />);
        } else if (disc.subType === 'Reel') {
          doms.push(<Reel { ...disc.reel } />);
        } else if (disc.subType === 'SailingShip') {
          doms.push(<Tank ref={ref} { ...disc.sailingShip } />);
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
            key={disc.identifier}
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
            transform={disc.transform}
            transformForTheJoint={disc.transformForTheJoint}
          />
        );
        break;
      case 'PastOrFuture':
        reply = (
          <PastOrFuture
            ref={ref}
            identifier={disc.identifier}
            contentsForFrontInner={disc.contentsForFrontInner}
            contentsForBottomInner={disc.contentsForBottomInner}
            discs={disc.discs}
            top={disc.top}
            left={disc.left}
            height={disc.height}
            width={disc.width}
            isPast={disc.isPast}
            z={disc.z}
            rotateY={disc.rotateY}
            tail={disc.tail}
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
            duration={disc.duration}
            transform={disc.transform||''}
          />
        );
        break;
      case 'MetalTape':
        reply = (
          <MetalTape
            ref={ref}
            identifier={disc.identifier}
            contentsForFrontInner={disc.contentsForFrontInner}
            top={disc.top}
            left={disc.left}
            height={disc.height}
            z={disc.z}
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
      case 'Cable':
        reply = (
          <Cable
            identifier={disc.identifier}
            subType={disc.subType}
            contentsForFrontInner={disc.contentsForFrontInner}
            contentsForBottomInner={disc.contentsForBottomInner}
            title={disc.title}
            height={disc.height}
            width={disc.width}
            left={disc.left}
            top={disc.top}
            isReact={isReact(disc)}
            doIt={disc.doIt}
            isBottomOnly={disc.isBottomOnly}
            z={disc.z}
            bp={disc.bp}
            ep={disc.ep}
            ex1={disc.ex1}
            allow={disc.allow}
            transform={disc.transform}
            leans={disc.leans}
          />
        );
        break;
      case 'DiscForDcosml':
        reply = (
          <DiscForDcosml
            identifier={disc.identifier}
            height={disc.height}
            width={disc.width}
            left={disc.left}
            top={disc.top}
            contentsForBottomInner={disc.contentsForBottomInner}
            dcoml={disc.dcoml}
            
            transform={disc.transform}
            duration={disc.duration}

            name={disc.name}
            color={disc.color}
            alias={disc.alias}
            background={disc.background}
            border={disc.border}
          />
        );
        break;
      case 'Foundation':
        reply = (
          <Foundation
            ref={ref}
            {...disc}
          />
        );
        break;
      case 'Cube':
        reply = (
          <Cube
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
