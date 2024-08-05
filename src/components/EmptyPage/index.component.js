import { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { gridValueTypeObj, gridValuesPresetArr, sectionCreationV3 } from '../../helpers/sectionCreation';
import useAddSection from '../../customHooks/useAddSection';
import { sectionCreationV1 } from '../../helpers/sectionCreation_Backup';
import { sectionCreationVersion2 } from '../../helpers/sectionCreation_Backup_V2';
import { sectionCreationV4 } from '../../helpers/sectionCreation_version4';
import { useDispatch, useSelector } from 'react-redux';
import { showEmptySectionScreen } from '../../redux/slices/emptySection';
import { dispatchDeletePageJson } from '../../services/pageJson/delete';
import { updateSectionsGridArea } from '../../services/internal/grid/gridControl';

export default function EmptyPage(props){
    const [showGrid, setShowGrid] = useState(props?.showGrid);
    const state = useSelector(state => state.emptySection);
    const presetObj = {
        1: {
            value1: 'I50-I50',
            // value1: 'I25-I25-I25-I25-I100',
            // value1: 'I25-I50-I25-I100',
            value: '50-50',
            value2:gridValuesPresetArr('I-100*.5,B-100,I-100*5,B-100'),
            value3: [
                {
                    size: 100,
                    type: 'inline',
                    blocks:{
                        block1: {
                            size: 100,
                            children: {
                                inline1: {
                                    size: 50,
                                    blocks: {
                                        block1: {
                                            size: 100
                                        }
                                    }
                                },
                                inline2: {
                                    size: 50,
                                    blocks: {
                                        block1: {
                                            size: 100
                                        }
                                    }
                                }
                            }
                        },
                    }
                }
                // ,{
                //     size: 50,
                //     type: 'inline',
                //     blocks:{
                //         block1: {
                //             size: 100,
                //         }
                //     }
                // }
            ],
            svg:`<svg viewBox="0 0 90 44" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" width="44" height="44"></rect><rect x="45.5" width="44" height="44"></rect></svg>`
        },
        2: {
            value1: 'I66-I33-I33-I66',
            value: '66-33-33-66',
            value2: gridValuesPresetArr('I-100/1.5,I-100/3,I-100/3,I-100/1.5'),
            svg: `<svg viewBox="0 0 89 44" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="59" height="21.5"></rect><rect x="60" width="29" height="21.5"></rect><rect y="22.5" width="29" height="21.5"></rect><rect x="30" y="22.5" width="59" height="21.5"></rect></svg>`
        },
        3: {
            value: '66-33-33-33-33-33-66-25-25-50',
            // value: 'c100-c50-50',
            value1:'I33-B66-B33-I33-B25-B25-B50-I33-B33-B33-B33',
            value2: gridValuesPresetArr('I-100/3,B-100/1.5,B-100/3,I-100/3,B-100*.25,B-100*.25,B-100*.5,I-100/3,B-100/3,B-100/3,B-100/3'),
            // I-100/3,B-100/1.5,B-100/3,I-100/3,B-100*.25,B-100*.25,B-100*.5,I-100/3,B-100/3,B-100/3,B-100/3
            value3: [
                {
                    size: 100,
                    type: 'inline',
                    blocks: {
                        block1: {
                            size: 100,
                            children: {
                                inline1: {
                                    size: 100/3,
                                    type: 'inline',
                                    blocks: {block1: {size: 100/1.5}, block2: {size: 100/3}}
                                },
                                inline2: {
                                    size: 100/3,
                                    type: 'inline',
                                    blocks: {block1: {size: 100*.25}, block2: {size: 100*.25}, block3:{size: 100*.5}}
                                },
                                inline3: {
                                    size: 100/3,
                                    type: 'inline',
                                    blocks: {block1:{size:100/3}, block2: {size: 100/3}, block3: {size: 100/3}}
                                }
                            }
                        }
                    }
                }
            ],

            value4: {
                inline1:{
                    size: 100,
                    blocks:{
                        block1:{
                            size: 100,
                            children:{
                                inline1:{size: 100/3,blocks: {block1: {size: 50},block2: {size: 50}}},
                                inline2:{size: 100/3,blocks: {block1: {size: 100}}},
                                inline3:{size: 100/3,blocks: {block1: {size: 100}}}
                            }
                        }
                    }
                }
            },
            // svg: `<svg viewBox="0 0 90 44" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" width="44" height="44"></rect><rect x="45.5" width="44" height="21.5"></rect><rect x="45.5" y="22.5" width="44" height="21.5"></rect></svg>`
            svg: `<svg viewBox="0 0 125 60" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="41" height="41.6667" fill="#D9D9D9"/><rect y="42.6665" width="41" height="17.3333" fill="#D9D9D9"/><rect x="42" width="41" height="14.25" fill="#D9D9D9"/><rect x="42" y="15.25" width="41" height="14.25" fill="#D9D9D9"/><rect x="42" y="30.5" width="41" height="29.5" fill="#D9D9D9"/><rect x="84" width="41" height="19.3333" fill="#D9D9D9"/><rect x="84" y="20.3335" width="41" height="19.3333" fill="#D9D9D9"/><rect x="84" y="40.6665" width="41" height="19.3333" fill="#D9D9D9"/></svg>`,
        },
        4: {
            // value: 'I50-I50-I100',
            value: '50-50-100',
            value1: 'I50-I50-I100',
            // value1: 'I33-B50-B25-B25-I33-B25-B50-B25-I33-B100-I100-B100',
            // value1: 'I50-B50-B50-I50-B50-B50',
            // value1: 'I25-B100-I25-B100-I25-B100-I25-B50-B50',
            // value2:gridValuesPresetArr('I-100*.5,B-100,I-100*.5,B-100*.5,B-100*.5,I-100,B-100'),
            value2: gridValuesPresetArr('I-100,B-100/1.5,I-100*.5,B-100,I-100*.5,B-100*.5,B-100*.5,B-100/3,I-100,B-100'),
            // value2: gridValuesPresetArr('I-100,B-100/1.5,I-100*.5,B-100,I-100*.5,B-100*.5,B-100*.5,B-100/3'),
            // value2: gridValuesPresetArr('I-100,B-50,I-100,B-100,B-50'),
            value3: [
                {
                    size: 100,
                    type: 'inline',
                    blocks: {
                        block1: {
                            size: 100/1.5,
                            children:{
                                inline1:{
                                    size: 100/3,
                                    type: 'inline',
                                    blocks:{
                                        block1: {
                                            size: (100/1.5)
                                        }
                                    }
                                },
                                inline2: {
                                    size: 100/3,
                                    type: 'inline',
                                    blocks: {
                                        block1: {
                                            size: 100/1.5
                                        }
                                    }
                                },
                                inline3: {
                                    size: 100/3,
                                    type: 'inline',
                                    blocks: {
                                        block1: {
                                            size: (100/1.5) * .5
                                        },
                                        block2: {
                                            size: (100/1.5) * .5
                                        }
                                    }
                                }
                            }
                        },
                        block2: {
                            size: (100/3) * .5,
                            children: {
                                inline1: {
                                    size: 25,
                                    type: 'inline',
                                    blocks: {
                                        block1:{
                                            size: (100/3) * .5,
                                            children: {
                                                inline1: {
                                                    size: 5,
                                                    blocks: {
                                                        block1: {
                                                            size: (100/3) * .5
                                                        }
                                                    }
                                                },
                                                inline2: {
                                                    size: 5,
                                                    blocks: {
                                                        block1: {
                                                            size: (100/3) * .5
                                                        }
                                                    }
                                                },
                                                inline3:{
                                                    size: 15,
                                                    blocks: {
                                                        block1: {
                                                            size: (100/3) * .5
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                inline2: {
                                    size: 75,
                                    type: 'inline',
                                    blocks: {
                                        block1:{
                                            size: (100/3) * .5,
                                            children:{
                                                inline1:{
                                                    size: 75/2,
                                                    blocks:{
                                                        block1:{
                                                            size: ((100/3) * .5) / 2
                                                        },
                                                        block2:{
                                                            size: ((100/3) * .5) / 2
                                                        }
                                                    }
                                                },
                                                inline2:{
                                                    size: 75/2,
                                                    blocks:{
                                                        block1:{
                                                            size: ((100/3) * .5) / 2
                                                        },
                                                        block2:{
                                                            size: ((100/3) * .5) / 2
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        block3: {
                            size: (100/3) * .5,
                            children: {
                                inline1: {
                                    size: 100,
                                    type: 'inline',
                                    blocks:{
                                        block1: {
                                            size: (100/3) * .5
                                        }
                                    }
                                },

                            }
                        },
                    }
                }
            ],

            value4v1: {
                inline1: {
                    size: 100,
                    blocks: {
                        block1: {size: 100/3,children: {inline1: {size: 100/3,blocks:{block1: {size: 100}}},inline2: {size: 100/3,blocks: {block1: {size: 100, children: {inline1: {size: 50, blocks: {block1: {size:50},block2: {size:50}}}, inline2: {size: 50, blocks: {block1: {size:100}}}}}}},inline3:{size: 100/3, blocks: {block1: {size: 50}, block2: {size: 50}}}}},
                        block2:{
                            // size: (100/3) * .5,
                            size: 100/3,
                            children: {
                                inline1:{
                                    size: 50,
                                    blocks: {
                                        block1:{
                                            size: 100,
                                            children: {
                                                inline1:{
                                                    size: 20,
                                                    blocks:{
                                                        block1:{
                                                            size: 25,
                                                            children: {
                                                                inline1: {
                                                                    size: 50,
                                                                    blocks:{
                                                                        block1: {
                                                                            size: 50,
                                                                            children: {inline1: {size: 50,blocks: {block1: {size: 100}}},inline2: {size: 50,blocks: {block1: {size: 100}}}}
                                                                        },
                                                                        block2: {
                                                                            size: 50
                                                                        }
                                                                    }
                                                                },
                                                                inline2: {
                                                                    size: 50,
                                                                    blocks:{
                                                                        block1: {
                                                                            size: 50
                                                                        },
                                                                        block2: {
                                                                            size: 50
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        block2:{
                                                            size: 25
                                                        },
                                                        block3:{
                                                            size: 50
                                                        }
                                                    }
                                                },
                                                inline2:{
                                                    size: 40,
                                                    blocks:{
                                                        block1:{
                                                            size: 100
                                                        }
                                                    }
                                                },
                                                inline3:{
                                                    size: 40,
                                                    blocks:{
                                                        block1:{
                                                            size: 100
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                inline2:{
                                    size: 50,
                                    blocks: {
                                        block1: {
                                            size: 100,
                                            children: {
                                                inline1:{
                                                    size: 50,
                                                    blocks: {
                                                        block1: {
                                                            size: 50,
                                                        },
                                                        block2: {
                                                            size: 50,
                                                        }
                                                    }
                                                },
                                                inline2:{
                                                    size: 50,
                                                    blocks: {
                                                        block1: {
                                                            size: 50,
                                                        },
                                                        block2: {
                                                            size: 50,
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        block3:{
                            // size: (100/3) * .5
                            size: 100 / 3
                        }
                    }
                }
            },

            value4v2: {
                inline1: {
                    size: 100,
                    blocks: {
                        block1: {
                            size: 100/3,
                            children: {
                                inline1: {
                                    size: 100/3,
                                    blocks:{
                                        block1: {
                                            size: 100
                                        }
                                    }
                                },
                                inline2: {
                                    size: 100/3,
                                    blocks: {
                                        block1: {
                                            size: 100/2,
                                            children:{
                                                inline1:{
                                                    size: 100 / 3,
                                                    blocks: {
                                                        block1: {size: 100}
                                                    }
                                                },
                                                inline2:{
                                                    size: 100 / 3,
                                                    blocks: {
                                                        block1: {size: 100}
                                                    }
                                                },
                                                inline3:{
                                                    size: 100 / 3,
                                                    blocks: {
                                                        block1: {size: 100}
                                                    }
                                                }
                                            }
                                        },
                                        block2: {size: 100/2},
                                        // block3: {size: 100/4},
                                        // block4: {size: 100/4}
                                        // block3: {size: 100/3}
                                    }
                                },
                                inline3:{
                                    size: 100/3, 
                                    blocks: {
                                        block1: {
                                            size: 50
                                        }, 
                                        block2: {
                                            size: 50
                                        }
                                    }
                                }
                            }
                        },
                        block2: {
                            size: 100/3,
                            children:{
                                inline1: {
                                    size: 10,
                                    blocks:{
                                        block1:{
                                            size: 25,
                                            children: {
                                                inline1: {
                                                    size: 25,
                                                    blocks:{
                                                        block1: {
                                                            size: 100
                                                        }
                                                    }
                                                },
                                                inline2: {
                                                    size: 25,
                                                    blocks:{
                                                        block1: {size: 100}
                                                    }
                                                },
                                                inline3: {
                                                    size: 50,
                                                    blocks:{
                                                        block1: {size: 100}
                                                    }
                                                }
                                            }
                                        },
                                        block2:{
                                            size: 25,
                                            children:{
                                                inline1:{
                                                    size: 50,
                                                    blocks:{
                                                        block1: {size: 100}
                                                    }
                                                },
                                                inline2:{
                                                    size: 50,
                                                    blocks:{
                                                        block1: {size: 100}
                                                    }
                                                }
                                            }
                                        },
                                        // block3:{
                                        //     size: 25,
                                        // },
                                        block4:{
                                            size: 50
                                        }
                                    }
                                },
                                inline2:{
                                    size: 20,
                                    blocks:{
                                        block1: {
                                            size: 100
                                        }
                                    }
                                },
                                inline3:{
                                    size: 20,
                                    blocks:{
                                        block1: {
                                            size: 100
                                        }
                                    }
                                },
                                inline4:{
                                    size: 25,
                                    blocks:{block1:{size: 50},block2:{size: 50}}
                                },
                                inline5:{
                                    size: 25,
                                    blocks:{block1:{size: 50},block2:{size: 50}}
                                }
                            }
                        },
                        block3:{
                            size: 100/3
                        }
                    }
                }
            },
            value4v3:{
                inline1: {
                    size: 50,
                    blocks: {
                        block1: {
                            size: 100/2,
                            children: {
                                inline1: {
                                    size: 100/3,
                                    blocks:{
                                        block1: {
                                            size: 100
                                        }
                                    }
                                },
                                inline2: {
                                    size: 100/3,
                                    blocks: {
                                        block1: {
                                            size: 100/2,
                                            children:{
                                                inline1:{
                                                    size: 100 / 3,
                                                    blocks: {
                                                        block1: {size: 100}
                                                    }
                                                },
                                                inline2:{
                                                    size: 100 / 3,
                                                    blocks: {
                                                        block1: {size: 100}
                                                    }
                                                },
                                                inline3:{
                                                    size: 100 / 3,
                                                    blocks: {
                                                        block1: {size: 100}
                                                    }
                                                }
                                            }
                                        },
                                        block2: {size: 100/2},
                                        // block3: {size: 100/4},
                                        // block4: {size: 100/4}
                                        // block3: {size: 100/3}
                                    }
                                },
                                inline3:{
                                    size: 100/3, 
                                    blocks: {
                                        block1: {
                                            size: 50
                                        }, 
                                        block2: {
                                            size: 50
                                        }
                                    }
                                }
                            }
                        },
                        block2:{
                            size: 100/2,
                            children:{
                                inline1: {
                                    size: 10,
                                    blocks:{
                                        block1:{
                                            size: 12.5,
                                            children:{
                                                inline1: {
                                                    size: 100/1.5,
                                                    blocks:{
                                                        block1: {size: 100}
                                                    }
                                                },
                                                inline2: {
                                                    size: (100/3) * .5,
                                                    blocks:{block1: {size: 100}}
                                                },
                                                inline3: {
                                                    size: (100/3) * .5,
                                                    blocks:{block1: {size: 100}}
                                                }
                                            }
                                            // children:{
                                            //     inline1:{
                                            //         size: 50,
                                            //         blocks: {
                                            //             block1:{size: 50},
                                            //             block2:{size: 50}
                                            //         }
                                            //     },
                                            //     inline2:{
                                            //         size: 50,
                                            //         blocks: {
                                            //             block1:{size: 50},
                                            //             block2:{size: 50}
                                            //         }
                                            //     }
                                            // }
                                        },
                                        block2:{
                                            size: 12.5,
                                        },
                                        block3:{
                                            size: 25,
                                        },
                                        block4:{
                                            size: 50,
                                        }
                                    }
                                },
                                inline2:{
                                    size : 20,
                                    blocks:{
                                        block1:{
                                            size: 100
                                        }
                                    }
                                },
                                inline3:{
                                    size: 20,
                                    blocks:{
                                        block1:{
                                            size: 100
                                        }
                                    }
                                },
                                inline4:{
                                    size: 25,
                                    blocks:{
                                        block1:{
                                            size : 50,
                                        },
                                        block2:{
                                            size : 50,
                                        }
                                    }
                                },
                                inline5:{
                                    size: 25,
                                    blocks:{
                                        block1:{
                                            size : 50,
                                        },
                                        block2:{
                                            size : 50,
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                inline2: {
                    size: 50,
                    blocks: {
                        block1: {
                            size: 100/2,
                            children: {
                                inline1: {
                                    size: 100/3,
                                    blocks:{
                                        block1: {
                                            size: 100
                                        }
                                    }
                                },
                                inline2: {
                                    size: 100/3,
                                    blocks: {
                                        block1: {
                                            size: 100/2,
                                            children:{
                                                inline1:{
                                                    size: 100 / 3,
                                                    blocks: {
                                                        block1: {size: 100}
                                                    }
                                                },
                                                inline2:{
                                                    size: 100 / 3,
                                                    blocks: {
                                                        block1: {size: 100}
                                                    }
                                                },
                                                inline3:{
                                                    size: 100 / 3,
                                                    blocks: {
                                                        block1: {size: 100}
                                                    }
                                                }
                                            }
                                        },
                                        block2: {size: 100/2},
                                        // block3: {size: 100/4},
                                        // block4: {size: 100/4}
                                        // block3: {size: 100/3}
                                    }
                                },
                                inline3:{
                                    size: 100/3, 
                                    blocks: {
                                        block1: {
                                            size: 50
                                        }, 
                                        block2: {
                                            size: 50
                                        }
                                    }
                                }
                            }
                        },
                        block2:{
                            size: 100/2,
                            children:{
                                inline1: {
                                    size: 10,
                                    blocks:{
                                        block1:{
                                            size: 12.5,
                                            children:{
                                                inline1: {
                                                    size: 100/1.5,
                                                    blocks:{
                                                        block1: {size: 100}
                                                    }
                                                },
                                                inline2: {
                                                    size: (100/3) * .5,
                                                    blocks:{block1: {size: 100}}
                                                },
                                                inline3: {
                                                    size: (100/3) * .5,
                                                    blocks:{block1: {size: 100}}
                                                }
                                            }
                                            // children:{
                                            //     inline1:{
                                            //         size: 50,
                                            //         blocks: {
                                            //             block1:{size: 50},
                                            //             block2:{size: 50}
                                            //         }
                                            //     },
                                            //     inline2:{
                                            //         size: 50,
                                            //         blocks: {
                                            //             block1:{size: 50},
                                            //             block2:{size: 50}
                                            //         }
                                            //     }
                                            // }
                                        },
                                        block2:{
                                            size: 12.5,
                                        },
                                        block3:{
                                            size: 25,
                                        },
                                        block4:{
                                            size: 50,
                                        }
                                    }
                                },
                                inline2:{
                                    size : 20,
                                    blocks:{
                                        block1:{
                                            size: 100
                                        }
                                    }
                                },
                                inline3:{
                                    size: 20,
                                    blocks:{
                                        block1:{
                                            size: 100
                                        }
                                    }
                                },
                                inline4:{
                                    size: 25,
                                    blocks:{
                                        block1:{
                                            size : 50,
                                        },
                                        block2:{
                                            size : 50,
                                        }
                                    }
                                },
                                inline5:{
                                    size: 25,
                                    blocks:{
                                        block1:{
                                            size : 50,
                                        },
                                        block2:{
                                            size : 50,
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            value4:{
                inline1:{
                    size: 100,
                    blocks: {
                        block1:{
                            size:100/3,
                            children:{
                                inline1:{
                                    size:100/2,
                                    blocks:{
                                        block1: {size: 100}
                                    }
                                },
                                 inline2:{
                                    size: 100/2,
                                    blocks:{
                                        block1:{size: 50},
                                        block2:{
                                            size: 50,
                                            children:{
                                                inline1: {
                                                    size: 50,
                                                    blocks: {
                                                        block1: {size: 100}
                                                    }
                                                },
                                                inline2: {
                                                    size: 50,
                                                    blocks: {
                                                        block1: {size: 100}
                                                    }
                                                }
                                            }
                                        }
                                    }
                                 },
                                //  inline3:{
                                //     size: 100/3,
                                //     blocks:{
                                //         block1:{
                                //             size: 100/3
                                //         },
                                //         block2:{
                                //             size: 100/3
                                //         },
                                //         block3:{
                                //             size: 100/3
                                //         }
                                //     }
                                //  }
                            }
                        },
                        block2:{
                            size: 100/1.5,
                            children:{
                                inline1: {
                                    size: 50,
                                    blocks:{
                                        block1:{
                                            size: 50,
                                            children:{
                                                inline1:{
                                                    size: 100/3,
                                                    blocks: {
                                                        block1:{size: 100}
                                                    }
                                                },
                                                inline2:{
                                                    size: 100/1.5,
                                                    blocks: {
                                                        block1:{size: 100}
                                                    }
                                                }
                                            }
                                        },
                                        block2:{
                                            size: 50
                                        }
                                    }
                                },
                                inline2: {
                                    size: 50,
                                    blocks:{
                                        block1:{size: 100}
                                    }
                                }
                            }
                        }
                    }
                }
            },
            value5: {
                size: 100,
                blocks: {
                    block1: {
                        size: 100/3,
                        children: {
                            inline1: {
                                size: 100/3,
                                blocks: {
                                    block1: { size: 100 }
                                }
                            },
                            inline2: {
                                size: 100/3,
                                blocks: {
                                    block1: { size: 100/2 },
                                    block2: { size: 100/2 },
                                }
                            },
                            inline3: {
                                size: 100/3,
                                blocks: {
                                    block1: { size: 50 },
                                    block2: { size: 50 },
                                }
                            }
                        }
                    },
                    block2: {
                        size: 100/3,
                        children: {
                            inline1: {
                                size: 10,
                                blocks: {
                                    block1: {
                                        size: 12.5,
                                        children: {
                                            inline1: { size: 25, blocks: { block1: { size: 100 } } },
                                            inline2: { size: 25, blocks: { block1: { size: 100 } } },
                                            inline3: { size: 50, blocks: { block1: { size: 100 } } }
                                        }
                                    },
                                    block2: {
                                        size: 12.5,
                                        children: {
                                            inline1: { size: 50, blocks: { block1: { size: 100 } } },
                                            inline2: { size: 50, blocks: { block1: { size: 100 } } }
                                        }
                                    },
                                    block3: { size: 25 },
                                    block4: { size: 50 }
                                }
                            },
                            inline2: { size: 20, blocks: { block1: { size: 100 } } },
                            inline3: { size: 20, blocks: { block1: { size: 100 } } },
                            inline4: { size: 25, blocks: { block1: { size: 50 }, block2: { size: 50 } } },
                            inline5: { size: 25, blocks: { block1: { size: 50 }, block2: { size: 50 } } }
                        }
                    },
                    block3: { size: 100/3 }
                }
            },
            // value1: 'I100-B66-BI50-BI50-BIB50-BIB50-B33-BI100',
            svg: `<svg viewBox="0 0 89 44" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="44" height="21.5"></rect><rect x="45" width="44" height="21.5"></rect><rect y="22.5" width="89" height="21.5"></rect></svg>`
        },
        5: {
            value: '33-33-33-33-66',
            // value1: 'I33-I33-I33-I33-I33-I33',
            // value1: 'I33-I66-I33-I66',
            value1: 'I33-I33-I33-I33-I66',
            // value1: 'I33-B66-B33-I33-B25-B50-B25-I33-B10-B50-B10-B10-B10-B10',
            value2: gridValuesPresetArr('I-100/3,I-100/3,I-100/3,I-100/3,I-100/1.5'),
            svg: `<svg viewBox="0 0 89 44" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="29" height="21.5"></rect><rect x="30" width="29" height="21.5"></rect><rect x="60" width="29" height="21.5"></rect><rect y="22.5" width="29" height="21.5"></rect><rect x="30" y="22.5" width="59" height="21.5"></rect></svg>`
        },
        6: {
            value: '66-33-33-33-33-33-66-25-25-50',
            value1: 'I66-I33-I33-I33-I33-I33-I66-I25-I25-I50',
            value2: gridValuesPresetArr('I-100/1.5,I-100/3,I-100/3,I-100/3,I-100/3,I-100/3,I-100/1.5,I-100*.25,I-100*.25,I-100*.5'),
            // svg: `<svg viewBox="0 0 90 44" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" width="44" height="21.5"></rect><rect x="45.5" width="44" height="21.5"></rect><rect x="0.5" y="22.5" width="44" height="21.5"></rect><rect x="45.5" y="22.5" width="44" height="21.5"></rect></svg>`
            svg: `<svg viewBox="0 0 125 60" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="83" height="14.25" fill="#D9D9D9"/><rect x="84" width="41" height="14.25" fill="#D9D9D9"/><rect y="15.25" width="41" height="14.25" fill="#D9D9D9"/><rect x="42" y="15.25" width="41" height="14.25" fill="#D9D9D9"/><rect x="84" y="15.25" width="41" height="14.25" fill="#D9D9D9"/><rect y="30.5" width="41" height="14.25" fill="#D9D9D9"/><rect x="42" y="30.5" width="83" height="14.25" fill="#D9D9D9"/><rect y="45.75" width="30.5" height="14.25" fill="#D9D9D9"/><rect x="31.5" y="45.75" width="30.5" height="14.25" fill="#D9D9D9"/><rect x="63" y="45.75" width="62" height="14.25" fill="#D9D9D9"/></svg>`
        }
    }

    const dispatch = useDispatch();
    const parentRef = useRef(null);

    useEffect(()=>{

        if(props?.isInnerSection){
            if(parentRef.current){
                parentRef.current.style.setProperty('--_self-emp-ga', "1/1/2/2");
                parentRef.current.style.setProperty('--_self-emp-br', "none");
            }
        }
    }, [props])

    const addSection = useAddSection();

    async function onPresetBtnClick(obj){
        const value = obj?.value;
        const splitValues = value?.split('-'); 
        if(splitValues.length){
            // const obj1 = await sectionCreationV1(obj.value);
            let sectionObj = props?.obj ? props?.obj : {};
            const obj2 = await sectionCreationVersion2(obj.value1, sectionObj);
            // const obj3 = await sectionCreationV3(obj.value2);
            // const obj4 = await sectionCreationV4(obj.value4, 'v7');
            // const obj5 = await sectionCreationV4(obj.value3, 'v3');
            let updateSectionObj = {
                [obj2?.uniqueKey]: {
                    ...obj2
                }
            }
            addSection(obj2?.uniqueKey, obj2);

            // dispatch(showEmptySectionScreen({
            //     show: false,
            //     currentSection: {},
            //     position : 'bottom',
            //     obj: {}
            // }))
        }
    }

    async function handleCloseORDeleteMethod(){
        // dispatchDeletePageJson

        if(!props?.isInnerSection){
            setShowGrid(false)
        }
        else{
            await updateSectionsGridArea(parentRef.current.parentElement, 'bottom', 'remove');
            dispatchDeletePageJson(props?.obj?.uniqueKey);
        }
    }
    return <>
        <div 
            className={styles.empty__parent}
            ref={parentRef}
            data-isinner-element={`${props?.isInnerSection}`}
        >
            {
                !showGrid ? <>
                    <div datatype='empty-screen-1'>
                        <h2>Start creating beautiful pages</h2>
                        <button onClick={() => setShowGrid(true)}>Create Section</button>
                    </div>
                </> : <>
                    <div datatype='empty-screen-2'>
                        <button type='button' datatype='close' 
                            // onClick={()=> setShowGrid(false)}
                            onClick={handleCloseORDeleteMethod}

                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <g filter="url(#filter0_dd_305_1938)">
                                    <path d="M24 8L8 24M8 8L24 24" stroke="#415A9C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </g>
                                <defs>
                                    <filter id="filter0_dd_305_1938" x="4" y="4" width="24" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                                        <feOffset dx="1" dy="1"></feOffset>
                                        <feGaussianBlur stdDeviation="1"></feGaussianBlur>
                                        <feComposite in2="hardAlpha" operator="out"></feComposite>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.794444 0 0 0 0 0.794444 0 0 0 0 0.866667 0 0 0 1 0"></feColorMatrix>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_305_1938"></feBlend>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                                        <feOffset dx="-1" dy="-1"></feOffset>
                                        <feGaussianBlur stdDeviation="1"></feGaussianBlur>
                                        <feComposite in2="hardAlpha" operator="out"></feComposite>
                                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"></feColorMatrix>
                                        <feBlend mode="normal" in2="effect1_dropShadow_305_1938" result="effect2_dropShadow_305_1938"></feBlend>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_305_1938" result="shape"></feBlend>
                                    </filter>
                                </defs>
                            </svg>
                        </button>
                        <p>Select your structure</p>
                        <ul>
                            {
                                presetObj && [...Object.keys(presetObj).map((key, index)=>{
                                    const obj = presetObj[key];
                                    return <li 
                                        key={index} 
                                        data-preset-key={key} 
                                        role='button'
                                        dangerouslySetInnerHTML={{__html: obj.svg}}
                                        onClick={() => onPresetBtnClick(obj)}
                                    ></li>
                                })]
                            }
                        </ul>
                    </div>
                </>
            }
        </div>
    </>
}