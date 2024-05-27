"use client";

import { useContext, useEffect, useState } from "react";
import { Product } from "@/components/main/product/productPage";
import { IoMdClose } from "react-icons/io";
import {
  cpuProducts,
  ramProducts,
  gpuProducts,
  moboProducts,
  hddProducts,
  ssdProducts,
  cpuCoolerProducts,
  monitorProducts,
  psuProducts,
} from "@/components/main/product/productPage";
import { Image } from "@nextui-org/react";
import { getBuildById } from "@/database/build";
import { getCaseComputerById } from "@/database/caseComputerProduct";
import { getCpuCoolerById } from "@/database/cpuCoolerProduct";
import { getCpuProductById } from "@/database/cpuProduct";
import { getGpuProductById } from "@/database/gpuProduct";
import { getMoboProductById } from "@/database/moboProduct";
import { getPsuProductById } from "@/database/psuProduct";
import { getRamProductById } from "@/database/ramProduct";
import { getSsdProductById } from "@/database/ssdProduct";
import { CompareCountContext } from "@/app/(main)/layout";

export default function ComparePage() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [secondSelectedProduct, setSecondSelectedProduct] =
    useState<Product | null>(null);
  const [selectedBuilds, setSelectedBuilds] = useState<any | null>(null);
  const [secondSelectedBuilds, setSecondSelectedBuilds] = useState<any | null>(null);
  const [compareBuildDatas, setCompareBuildData] = useState<any[]>([]);
  const { compareCounts, setCompareCounts } = useContext(CompareCountContext);

  const fetchBuildData = async (buildId: string) => {
    try {
      const build = await getBuildById(buildId);

      if (!build) {
        console.error("Build not found:", buildId);
        return null;
      }

      const [
        cpuData,
        moboData,
        ramData,
        gpuData,
        ssdData,
        psuData,
        caseData,
        coolerData
      ] = await Promise.all([
        getCpuProductById(build.cpu_id),
        getMoboProductById(build.mobo_id),
        getRamProductById(build.ram_id),
        getGpuProductById(build.gpu_id),
        getSsdProductById(build.ssd_id ?? ''),
        getPsuProductById(build.psu_id),
        getCaseComputerById(build.case_id),
        getCpuCoolerById(build.cpuCooler_id)
      ]);

      return {
        build,
        cpuData,
        moboData,
        ramData,
        gpuData,
        ssdData,
        psuData,
        caseData,
        coolerData
      };
    } catch (error) {
      console.error("Error fetching build data:", error);
      return null;
    }
  };

  useEffect(() => {
    const initializeComparisonData = async () => {
      const savedProducts = localStorage.getItem("compareData");
      if (savedProducts) {
        const parsedProducts: Product[] = JSON.parse(savedProducts);
        setSelectedProducts(parsedProducts);
      }

      const savedBuildData = localStorage.getItem("compareBuildData");
      if (savedBuildData) {
        const parsedBuildData: { build: { id: string } }[] = JSON.parse(savedBuildData);

        const buildDetailsPromises = parsedBuildData.map((data) => fetchBuildData(data.build.id));
        const buildDetails = await Promise.all(buildDetailsPromises);
        setCompareBuildData(buildDetails.filter((detail) => detail !== null));
      }

      const totalProducts = savedProducts ? JSON.parse(savedProducts).length : 0;
      const totalBuilds = savedBuildData ? JSON.parse(savedBuildData).length : 0;
      setCompareCounts(totalProducts + totalBuilds);
    };

    initializeComparisonData();
  }, [setCompareCounts]);

  const filterProductsByType = (
    type: string,
    selectedProducts: Product[]
  ): Product[] => {
    return selectedProducts.filter((product) => product.typeProduct === type);
  };

  const removeFromLocalStorage = (product: Product) => {
    const updatedProducts = selectedProducts.filter((p) => p !== product);
    localStorage.setItem("compareData", JSON.stringify(updatedProducts));
    setSelectedProducts(updatedProducts);
    setCompareCounts(compareCounts - 1);

    if (selectedProduct === product) {
      setSelectedProduct(null);
    }
    if (secondSelectedProduct === product) {
      setSecondSelectedProduct(null);
    }
  };

  const removeBuildFromLocalStorage = (buildId: string) => {
    const updatedBuildData = compareBuildDatas.filter((data) => data.build.id !== buildId);
    try {
      localStorage.setItem("compareBuildData", JSON.stringify(updatedBuildData));
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
    setCompareBuildData(updatedBuildData);
    setCompareCounts(compareCounts - 1);

    if (selectedBuilds && selectedBuilds.build && selectedBuilds.build.id === buildId) {
      setSelectedBuilds(null);
    }
    if (secondSelectedBuilds && secondSelectedBuilds.build && secondSelectedBuilds.build.id === buildId) {
      setSecondSelectedBuilds(null);
    }
  };

  const handleBuildClick = (build: any) => {
    if (selectedBuilds && selectedBuilds.build && selectedBuilds.build.id === build.build.id) {
      setSelectedBuilds(null);
    } else if (secondSelectedBuilds && secondSelectedBuilds.build && secondSelectedBuilds.build.id === build.build.id) {
      setSecondSelectedBuilds(null);
    } else if (!selectedBuilds || !selectedBuilds.build) {
      setSelectedBuilds(build);
    } else if (!secondSelectedBuilds || !secondSelectedBuilds.build) {
      setSecondSelectedBuilds(build);
    }
  };

  const handleProductClick = (product: Product) => {
    const productType = product.typeProduct;

    if (
      (selectedProduct && selectedProduct.typeProduct !== productType) ||
      (secondSelectedProduct && secondSelectedProduct.typeProduct !== productType)
    ) {
      setSelectedProduct(product);
      setSecondSelectedProduct(null);
    } else if (selectedProduct === product) {
      setSelectedProduct(null);
    } else if (secondSelectedProduct === product) {
      setSecondSelectedProduct(null);
    } else if (!selectedProduct) {
      setSelectedProduct(product);
    } else if (!secondSelectedProduct) {
      setSecondSelectedProduct(product);
    }
  };

  const renderProductSection = (type: string) => {
    const products = filterProductsByType(type, selectedProducts);

    return (
      <>
        <p
          style={{ fontSize: "24px", marginTop: "30px", marginBottom: "15px" }}
        >
          {type}
        </p>
        <div style={{ marginLeft: "45%" }}></div>
        {products.map((product, index) => (
          <div
            key={index}
            style={{ display: "inline-block", textAlign: "center", margin: "0 10px"}}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={80}
              height={80}
              style={{
                boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                position: "relative",
                border: (product === selectedProduct || product === secondSelectedProduct) ? "2px solid #00A9FF" : "none",
                pointerEvents: selectedBuilds || secondSelectedBuilds ? "none" : "auto",
                opacity: selectedBuilds || secondSelectedBuilds ? 0.5 : 1,
              }}
              onClick={() => handleProductClick(product)}
            />
            <p>
              {product.name.length > 9
                ? `${product.name.substring(0, 9)}...`
                : product.name}
            </p>
            <button onClick={() => removeFromLocalStorage(product)}>
              <IoMdClose style={{ width: "20px", height: "20px" }} />
            </button>
          </div>
        ))}
      </>
    );
  };

  const renderBuildSection = () => {
    return (
      <>
        <p style={{ fontSize: "24px", marginTop: "30px", marginBottom: "15px" }}>PC build</p>
        <div style={{ marginLeft: "45%" }}></div>
        {compareBuildDatas.map((build, index) => (
          <div key={index} style={{ display: "inline-block", textAlign: "center", margin: "0 10px" }}>
            <Image
              src={build.build.image}
              alt={build.build.buildName}
              width={80}
              height={80}
              style={{
                boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                position: "relative",
                border: (build === selectedBuilds || build === secondSelectedBuilds) ? "2px solid #00A9FF" : "none",
                pointerEvents: selectedProduct || secondSelectedProduct ? "none" : "auto",
                opacity: selectedProduct || secondSelectedProduct ? 0.5 : 1,
              }}
              onClick={() => handleBuildClick(build)}
            />
            <p>
              {build.build.buildName.length > 9
                ? `${build.build.buildName.substring(0, 9)}...`
                : build.build.buildName}
            </p>
            <button onClick={() => removeBuildFromLocalStorage(build.build.id)}>
              <IoMdClose style={{ width: "20px", height: "20px" }} />
            </button>
          </div>
        ))}
      </>
    );
  };

  const calculateTotalPricefirstbuild = () => {
    if (!selectedBuilds) return 0;

    const components = [
      selectedBuilds.caseData,
      selectedBuilds.coolerData,
      selectedBuilds.cpuData,
      selectedBuilds.gpuData,
      selectedBuilds.moboData,
      selectedBuilds.psuData,
      selectedBuilds.ramData,
      selectedBuilds.ssdData,
    ];

    return components.reduce((total, component) => {
      const price = parseFloat(component.price || "0");
      return total + price;
    }, 0);
  };

  const calculateTotalPricesecondbuild = () => {
    if (!secondSelectedBuilds) return 0;

    const components = [
      secondSelectedBuilds.caseData,
      secondSelectedBuilds.coolerData,
      secondSelectedBuilds.cpuData,
      secondSelectedBuilds.gpuData,
      secondSelectedBuilds.moboData,
      secondSelectedBuilds.psuData,
      secondSelectedBuilds.ramData,
      secondSelectedBuilds.ssdData,
    ];

    return components.reduce((total, component) => {
      const price = parseFloat(component.price || "0");
      return total + price;
    }, 0);
  };

  return (
    <>
      <div
        style={{
          borderTop: "5px solid #00A9FF",
          boxShadow: "5px 4px 8px rgba(0, 0, 0, 0.1)",
          width: "auto",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
          <div
            style={{
              width: "400px",
              height: "800px",
              flex: "1",
              boxSizing: "border-box",
              padding: "10px",
              margin: "10px",
              boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
              overflow: "auto",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "24px",
              }}
            >
              Select
            </p>

            <div style={{ marginLeft: "45%" }}></div>
            {renderBuildSection()}
            {renderProductSection("CPU")}
            {renderProductSection("GPU")}
            {renderProductSection("RAM")}
            {renderProductSection("SSD")}
            {renderProductSection("HDD")}
            {renderProductSection("Power Supply")}
            {renderProductSection("Mother Board")}
            {renderProductSection("CPU Cooler")}
            {renderProductSection("Monitor")}
          </div>

          {/* Right side content */}
          <div
            style={{
              width: "400px",
              height: "800px",
              flex: "1",
              boxSizing: "border-box",
              padding: "10px",
              margin: "10px",
              boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
          >
            {selectedProduct && (
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <IoMdClose style={{ width: "20px", height: "20px" }} />
              </button>
            )}
            {selectedProduct && (
              <p
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "24px",
                }}
              >
                {selectedProduct.name}
              </p>
            )}
            {selectedProduct && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    width={200}
                    height={200}
                    style={{
                      boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </div>
              </div>
            )}
            {selectedBuilds && selectedBuilds.build && (
              <>
                <button
                  onClick={() => setSelectedBuilds(null)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <IoMdClose style={{ width: "20px", height: "20px" }} />
                </button>
                <p
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "24px",
                  }}
                >
                  {selectedBuilds.build.buildName}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                    <Image
                      src={selectedBuilds.build.image}
                      alt={selectedBuilds.build.buildName}
                      width={200}
                      height={200}
                      style={{
                        boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </div>
                </div>
                <div style={{ textAlign: "left" }}>
                  <p>CPU: {selectedBuilds.cpuData.name}</p>
                  <p>GPU: {selectedBuilds.gpuData.name}</p>
                  <p>Mainboard: {selectedBuilds.moboData.name}</p>
                  <p>Powersupply: {selectedBuilds.psuData.name}</p>
                  <p>RAM: {selectedBuilds.ramData.name}</p>
                  <p>SSD: {selectedBuilds.ssdData.name}</p>
                  <p>Cooler: {selectedBuilds.coolerData.name}</p>
                  <p>Case: {selectedBuilds.caseData.name}</p>
                  <p>Total Price: {calculateTotalPricefirstbuild()} THB</p>
                </div>
              </>
            )}
            {selectedProduct && (
              <div style={{ textAlign: "left" }}>
                {selectedProduct?.typeProduct === "CPU" && (
                  <div>
                    <p>Type: {(selectedProduct as cpuProducts).type}</p>
                    <p>Socket: {(selectedProduct as cpuProducts).socket}</p>
                    <p>Core: {(selectedProduct as cpuProducts).core}</p>
                    <p>Thread: {(selectedProduct as cpuProducts).thread}</p>
                    <p>Year: {(selectedProduct as cpuProducts).year}</p>
                    <p>TDP: {(selectedProduct as cpuProducts).tdp} W</p>
                    <p>
                      Base Clock: {(selectedProduct as cpuProducts).clock} GHz
                    </p>
                    <p>
                      Turbo Clock: {(selectedProduct as cpuProducts).turbo} GHz
                    </p>
                  </div>
                )}
                {selectedProduct?.typeProduct === "RAM" && (
                  <div>
                    <p>Size: {(selectedProduct as ramProducts).size}</p>
                    <p>Type: {(selectedProduct as ramProducts).type}</p>
                    <p>Kit: {(selectedProduct as ramProducts).kit}</p>
                    <p>Bus Speed: {(selectedProduct as ramProducts).bus}</p>
                  </div>
                )}
                {selectedProduct?.typeProduct === "GPU" && (
                  <div>
                    <p>Type: {(selectedProduct as gpuProducts).type}</p>
                    <p>
                      Architecture:{" "}
                      {(selectedProduct as gpuProducts).architecture}
                    </p>
                    <p>
                      Performance:{" "}
                      {(selectedProduct as gpuProducts).performance}
                    </p>
                    <p>Year: {(selectedProduct as gpuProducts).year}</p>
                    <p>
                      Series: {(selectedProduct as gpuProducts).series}
                    </p>
                    <p>VRAM: {(selectedProduct as gpuProducts).vram}</p>
                    <p>TDP: {(selectedProduct as gpuProducts).tdp} W</p>
                    <p>
                      Motherboard Bus:{" "}
                      {(selectedProduct as gpuProducts).motherboardBus}
                    </p>
                    <p>
                      Core Clock: {(selectedProduct as gpuProducts).coreClock}{" "}
                      MHz
                    </p>
                    <p>
                      Boost Clock: {(selectedProduct as gpuProducts).boostClock}{" "}
                      MHz
                    </p>
                    <p>
                      Effective Clock:{" "}
                      {(selectedProduct as gpuProducts).effectiveClock} MHz
                    </p>
                    <p>Length: {(selectedProduct as gpuProducts).length} mm</p>
                    <p>
                      Cooling Fans:{" "}
                      {(selectedProduct as gpuProducts).coolingFans}
                    </p>
                    <p>
                      Case Slots: {(selectedProduct as gpuProducts).caseSlots}
                    </p>
                    <p>
                      Frame Sync: {(selectedProduct as gpuProducts).frameSync}
                    </p>
                  </div>
                )}
                {selectedProduct?.typeProduct === "SSD" && (
                  <div>
                    <p>Size: {(selectedProduct as ssdProducts).size}</p>
                    <p>Type: {(selectedProduct as ssdProducts).type}</p>
                    <p>
                      Read Speed: {(selectedProduct as ssdProducts).speedRead}
                    </p>
                    <p>
                      Write Speed: {(selectedProduct as ssdProducts).speedWrite}
                    </p>
                  </div>
                )}
                {selectedProduct?.typeProduct === "HDD" && (
                  <div>
                    <p>Size: {(selectedProduct as hddProducts).size}</p>
                    <p>
                      Read Speed: {(selectedProduct as hddProducts).speedRead}
                    </p>
                    <p>
                      Write Speed: {(selectedProduct as hddProducts).speedWrite}
                    </p>
                  </div>
                )}
                {selectedProduct?.typeProduct === "Power Supply" && (
                  <div>
                    <p>Wattage: {(selectedProduct as psuProducts).wattage} W</p>
                  </div>
                )}
                {selectedProduct?.typeProduct === "Mother Board" && (
                  <div>
                    <p>Size: {(selectedProduct as moboProducts).size}</p>
                    <p>Socket: {(selectedProduct as moboProducts).socketCPU}</p>
                    <p>Ram Slot: {(selectedProduct as moboProducts).ramslot}</p>
                  </div>
                )}
                {selectedProduct?.typeProduct === "CPU Cooler" && (
                  <div>
                    <p>Socket: {(selectedProduct as cpuCoolerProducts).socket}</p>
                  </div>
                )}
                {selectedProduct?.typeProduct === "Monitor" && (
                  <div>
                    <p>Panel Type: {(selectedProduct as monitorProducts).panelType}</p>
                    <p>Resolution: {(selectedProduct as monitorProducts).resolution}</p>
                    <p>Refresh Rate: {(selectedProduct as monitorProducts).refreshRate}</p>
                    <p>Size: {(selectedProduct as monitorProducts).size}</p>
                    <p>FreeSync: {(selectedProduct as monitorProducts).freesync}</p>
                    <p>G-Sync: {(selectedProduct as monitorProducts).gsync}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* More right side content */}
          <div
            style={{
              width: "400px",
              height: "800px",
              flex: "1",
              boxSizing: "border-box",
              padding: "10px",
              margin: "10px",
              boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
          >
            {secondSelectedBuilds && secondSelectedBuilds.build && (
              <>
                <button
                  onClick={() => setSecondSelectedBuilds(null)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <IoMdClose style={{ width: "20px", height: "20px" }} />
                </button>
                <p
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "24px",
                  }}
                >
                  {secondSelectedBuilds.build.buildName}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                    <Image
                      src={secondSelectedBuilds.build.image}
                      alt={secondSelectedBuilds.build.buildName}
                      width={200}
                      height={200}
                      style={{
                        boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </div>
                </div>
                <div style={{ textAlign: "left" }}>
                  <p>CPU: {secondSelectedBuilds.cpuData.name}</p>
                  <p>GPU: {secondSelectedBuilds.gpuData.name}</p>
                  <p>Mainboard: {secondSelectedBuilds.moboData.name}</p>
                  <p>Powersupply: {secondSelectedBuilds.psuData.name}</p>
                  <p>RAM: {secondSelectedBuilds.ramData.name}</p>
                  <p>SSD: {secondSelectedBuilds.ssdData.name}</p>
                  <p>Cooler: {secondSelectedBuilds.coolerData.name}</p>
                  <p>Case: {secondSelectedBuilds.caseData.name}</p>
                  <p>Total Price: {calculateTotalPricesecondbuild()} THB</p>
                </div>
              </>
            )}
            {secondSelectedProduct && (
              <button
                onClick={() => setSecondSelectedProduct(null)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <IoMdClose style={{ width: "20px", height: "20px" }} />
              </button>
            )}
            {secondSelectedProduct && (
              <p
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "24px",
                }}
              >
                {secondSelectedProduct.name}
              </p>
            )}
            {secondSelectedProduct && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                  <Image
                    src={secondSelectedProduct.image}
                    alt={secondSelectedProduct.name}
                    width={200}
                    height={200}
                    style={{
                      boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </div>
              </div>
            )}
            {secondSelectedProduct && (
              <div style={{ textAlign: "left" }}>
                {secondSelectedProduct?.typeProduct === "CPU" && (
                  <div>
                    <p>Type: {(secondSelectedProduct as cpuProducts).type}</p>
                    <p>
                      Socket: {(secondSelectedProduct as cpuProducts).socket}
                    </p>
                    <p>Core: {(secondSelectedProduct as cpuProducts).core}</p>
                    <p>
                      Thread: {(secondSelectedProduct as cpuProducts).thread}
                    </p>
                    <p>Year: {(secondSelectedProduct as cpuProducts).year}</p>
                    <p>TDP: {(secondSelectedProduct as cpuProducts).tdp} W</p>
                    <p>
                      Base Clock: {(secondSelectedProduct as cpuProducts).clock}{" "}
                      GHz
                    </p>
                    <p>
                      Turbo Clock:{" "}
                      {(secondSelectedProduct as cpuProducts).turbo} GHz
                    </p>
                  </div>
                )}
                {secondSelectedProduct?.typeProduct === "RAM" && (
                  <div>
                    <p>Size: {(secondSelectedProduct as ramProducts).size}</p>
                    <p>Type: {(secondSelectedProduct as ramProducts).type}</p>
                    <p>Kit: {(secondSelectedProduct as ramProducts).kit}</p>
                    <p>
                      Bus Speed: {(secondSelectedProduct as ramProducts).bus}
                    </p>
                  </div>
                )}
                {secondSelectedProduct?.typeProduct === "GPU" && (
                  <div>
                    <p>Type: {(secondSelectedProduct as gpuProducts).type}</p>
                    <p>
                      Architecture:{" "}
                      {(secondSelectedProduct as gpuProducts).architecture}
                    </p>
                    <p>
                      Performance:{" "}
                      {(secondSelectedProduct as gpuProducts).performance}
                    </p>
                    <p>Year: {(secondSelectedProduct as gpuProducts).year}</p>
                    <p>
                      Series: {(secondSelectedProduct as gpuProducts).series}
                    </p>
                    <p>VRAM: {(secondSelectedProduct as gpuProducts).vram}</p>
                    <p>TDP: {(secondSelectedProduct as gpuProducts).tdp} W</p>
                    <p>
                      Motherboard Bus:{" "}
                      {(secondSelectedProduct as gpuProducts).motherboardBus}
                    </p>
                    <p>
                      Core Clock:{" "}
                      {(secondSelectedProduct as gpuProducts).coreClock} MHz
                    </p>
                    <p>
                      Boost Clock:{" "}
                      {(secondSelectedProduct as gpuProducts).boostClock} MHz
                    </p>
                    <p>
                      Effective Clock:{" "}
                      {(secondSelectedProduct as gpuProducts).effectiveClock}{" "}
                      MHz
                    </p>
                    <p>
                      Length: {(secondSelectedProduct as gpuProducts).length} mm
                    </p>
                    <p>
                      Cooling Fans:{" "}
                      {(secondSelectedProduct as gpuProducts).coolingFans}
                    </p>
                    <p>
                      Case Slots:{" "}
                      {(secondSelectedProduct as gpuProducts).caseSlots}
                    </p>
                    <p>
                      Frame Sync:{" "}
                      {(secondSelectedProduct as gpuProducts).frameSync}
                    </p>
                  </div>
                )}
                {secondSelectedProduct?.typeProduct === "SSD" && (
                  <div>
                    <p>Size: {(secondSelectedProduct as ssdProducts).size}</p>
                    <p>Type: {(secondSelectedProduct as ssdProducts).type}</p>
                    <p>
                      Read Speed:{" "}
                      {(secondSelectedProduct as ssdProducts).speedRead}
                    </p>
                    <p>
                      Write Speed:{" "}
                      {(secondSelectedProduct as ssdProducts).speedWrite}
                    </p>
                  </div>
                )}
                {secondSelectedProduct?.typeProduct === "HDD" && (
                  <div>
                    <p>Size: {(secondSelectedProduct as hddProducts).size}</p>
                    <p>
                      Read Speed:{" "}
                      {(secondSelectedProduct as hddProducts).speedRead}
                    </p>
                    <p>
                      Write Speed:{" "}
                      {(secondSelectedProduct as hddProducts).speedWrite}
                    </p>
                  </div>
                )}
                {secondSelectedProduct?.typeProduct === "Power Supply" && (
                  <div>
                    <p>
                      Wattage: {(secondSelectedProduct as psuProducts).wattage}{" "}
                      W
                    </p>
                  </div>
                )}
                {secondSelectedProduct?.typeProduct === "Mother Board" && (
                  <div>
                    <p>Size: {(secondSelectedProduct as moboProducts).size}</p>
                    <p>
                      Socket: {(secondSelectedProduct as moboProducts).socketCPU}
                    </p>
                    <p>
                      Ram Slot:{" "}
                      {(secondSelectedProduct as moboProducts).ramslot}
                    </p>
                  </div>
                )}
                {secondSelectedProduct?.typeProduct === "CPU Cooler" && (
                  <div>
                    <p>
                      Socket:{" "}
                      {(secondSelectedProduct as cpuCoolerProducts).socket}
                    </p>
                  </div>
                )}
                {secondSelectedProduct?.typeProduct === "Monitor" && (
                  <div>
                    <p>
                      Panel Type:{" "}
                      {(secondSelectedProduct as monitorProducts).panelType}
                    </p>
                    <p>
                      Resolution:{" "}
                      {(secondSelectedProduct as monitorProducts).resolution}
                    </p>
                    <p>
                      Refresh Rate:{" "}
                      {(secondSelectedProduct as monitorProducts).refreshRate}
                    </p>
                    <p>Size: {(secondSelectedProduct as monitorProducts).size}</p>
                    <p>
                      FreeSync:{" "}
                      {(secondSelectedProduct as monitorProducts).freesync}
                    </p>
                    <p>
                      G-Sync: {(secondSelectedProduct as monitorProducts).gsync}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
