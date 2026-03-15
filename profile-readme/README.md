# Jordão Fernandes de Andrade

**M.Sc. Economics | Machine Learning & Causal Inference**

[LinkedIn](https://www.linkedin.com/in/jordaofernandes/) • [Portfolio](https://jf-andrade.github.io/) • [Email](mailto:jordaoandrade@gmail.com)

---

## Bio

> I am a Senior Data Scientist and Economist specializing in causal inference and uncertainty quantification. I architect decision-support systems that bridge advanced Econometrics and scalable Machine Learning, enabling stakeholders to optimize budget allocation and strategy under strict real-world constraints.

<br>

## Technical Expertise

### Methodological Core

![Causal Inference](https://img.shields.io/badge/Causal_Inference-4CAF50?style=flat-square)
![Bayesian Modeling](https://img.shields.io/badge/Bayesian_Modeling-9C27B0?style=flat-square)
![Econometrics](https://img.shields.io/badge/Econometrics-607D8B?style=flat-square)
![PyMC](https://img.shields.io/badge/PyMC-5C2D91?style=flat-square&logo=pymc&logoColor=white)
![ArviZ](https://img.shields.io/badge/ArviZ-1E88E5?style=flat-square&logo=arviz&logoColor=white)

### Engineering Stack

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=flat-square&logo=tensorflow&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)
![MLflow](https://img.shields.io/badge/MLflow-0194E2?style=flat-square&logo=mlflow&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazon-aws&logoColor=white)

**Key Competencies:** Causal Discovery (`DID`, `RDD`, `Synthetic Control`), A/B Testing, Time Series Forecasting, Hierarchical Modeling.
**Tooling:** `SQL`, `Pandas`, `NumPy`, `Scikit-learn`, `CatBoost`, `Optuna`, `Streamlit`, `Git`, `Linux`.

---

## Strategic Projects

### Marketing Science: Bayesian MMM

**Impact:** `Uncertainty Quantification (94% HDI)` for multi-region budget optimization.

Multi-region Bayesian Marketing Mix Model (MMM) estimating channel ROI across 18 territories to optimize strategic ad spend. I implemented non-linear state-space representations using PyMC to handle sparse regional data and isolate true incremental media effects from baseline organic demand. I modeled Geometric Adstock and Logistic Saturation to enforce realistic diminishing returns, resolving parameter identifiability issues common in frequentist MMMs. To ensure adoption, I wrapped the inference engine in a Streamlit application, delivering localized 94% HDI bounds for safe budget reallocation.

- **Stack:** `PyMC-Marketing` `ArviZ` `Streamlit`

[![View Code](https://img.shields.io/badge/View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/JF-Andrade/MMM-Figshare-eCommerce)

### Personalization: Recommender Systems

**Impact:** `+389% Lift` in purchase conversion vs. naive baselines.

Production-grade Two-Stage Recommendation pipeline (Retrieval + Ranking) serving daily personalized feeds to 1.37M customers. I designed a Two-Tower retrieval architecture (TensorFlow Recommenders) to rapidly filter the item space while meeting strict SLA latency constraints for the web client. To address the cold-start problem inherent in high-turnover fashion catalogs, I engineered visual embeddings using ResNet50. The candidate subset is then passed to a CatBoost ranker, mitigating heavy computational costs while maximizing precision, resulting in a robust system capable of handling aggressive seasonal rotations.

- **Stack:** `TensorFlow Recommenders` `CatBoost` `Optuna`

[![View Code](https://img.shields.io/badge/View_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/JF-Andrade/two-tower_recommendation)

---

## Academic & Publications

- **Master of Science in Economics** — UNICAMP (2023)
- **Bachelor of Economics** — UFRJ (2017)

**Publication:**
_Andrade, J. F., et al. (2026). Investment share and economic growth in Latin America. **Review of Keynesian Economics**._

---

<div align="center">

<p align="center">
  <a href="https://www.linkedin.com/in/jordaofernandes/">LinkedIn</a> • 
  <a href="https://jf-andrade.github.io/">Full Portfolio</a> • 
  <a href="https://github.com/JF-Andrade/JF-Andrade.github.io">Portfolio Repository</a>
</p>

</div>
