"use client";

import { useEffect, useState } from "react";
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

export default function ComparePage() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [secondSelectedProduct, setSecondSelectedProduct] =
    useState<Product | null>(null);
  useEffect(() => {
    // Fetch selected products from local storage or props
    const savedProducts = localStorage.getItem("compareData");
    if (savedProducts) {
      const parsedProducts: Product[] = JSON.parse(savedProducts);
      setSelectedProducts(parsedProducts);
    }
  }, []);
  
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
    
    // Remove details of the product being removed from selectedProduct and secondSelectedProduct
    if (selectedProduct === product) {
      setSelectedProduct(null);
    }
    if (secondSelectedProduct === product) {
      setSecondSelectedProduct(null);
    }
  };
  

  const handleProductClick = (product: Product) => {
    if (selectedProduct === product) {
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
                // Highlight the selected product with a border
                border: (product === selectedProduct || product === secondSelectedProduct) ? "2px solid #00A9FF" : "none",
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

            {/* PC build section 
            <p
              style={{
                fontSize: "24px",
                marginTop: "30px",
                marginBottom: "15px",
              }}
            >
              PC build
            </p>*/}

            <div style={{ marginLeft: "45%" }}></div>

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
                    <p>Series: {(selectedProduct as gpuProducts).series}</p>
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
                    <p>Socket: {(selectedProduct as moboProducts).socket}</p>
                    <p>Ram Slot: {(selectedProduct as moboProducts).ramslot}</p>
                  </div>
                )}
                {selectedProduct?.typeProduct === "CPU Cooler" && (
                  <div>
                    <p>
                      Socket: {(selectedProduct as cpuCoolerProducts).socket}
                    </p>
                  </div>
                )}
                {selectedProduct?.typeProduct === "Monitor" && (
                  <div>
                    <p>
                      Panel Type:{" "}
                      {(selectedProduct as monitorProducts).panelType}
                    </p>
                    <p>
                      Resolution:{" "}
                      {(selectedProduct as monitorProducts).resolution}
                    </p>
                    <p>
                      Refresh Rate:{" "}
                      {(selectedProduct as monitorProducts).refreshRate}
                    </p>
                    <p>Size: {(selectedProduct as monitorProducts).size}</p>
                    <p>
                      FreeSync: {(selectedProduct as monitorProducts).freesync}
                    </p>
                    <p>G-Sync: {(selectedProduct as monitorProducts).gsync}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          {/*more right side content*/}
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
                      {(secondSelectedProduct as ssdProducts).speedRead}
                    </p>
                    <p>
                      Write Speed:{" "}
                      {(secondSelectedProduct as ssdProducts).speedWrite}
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
                      Socket: {(secondSelectedProduct as moboProducts).socket}
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
                    <p>
                      Size: {(secondSelectedProduct as monitorProducts).size}
                    </p>
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
